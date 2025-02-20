import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DonationForm = () => {
  const { id: donationId } = useParams();
  const [donationAmount, setDonationAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [tipAmount, setTipAmount] = useState(Math.round(500 * 0.04));
  const [formData, setFormData] = useState({
    donorName: "",
    mobileNumber: "",
    email: "",
    billingAddress: "",
    pincode: "",
    panNumber: "",
  });
  const [donorId, setDonorId] = useState(null);

  // Fetch user details to check if the user is a donor
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.role === "Donor") {
          setDonorId(data._id);
          setFormData((prev) => ({ ...prev, email: data.email, donorName: data.name }));
        } else {
          alert("Only donors can make donations.");
          window.location.href = "/"; // Redirect non-donors
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
    setTipAmount(Math.round(amount * 0.04)); // Default 4% tip
  };

  const handleCustomAmountChange = (e) => {
    const amount = Number(e.target.value);
    if (amount >= 10) {
      setCustomAmount(amount);
      setDonationAmount(amount);
      setTipAmount(Math.round(amount * 0.04));
    }
  };

  const handleTipChange = (e) => {
    const tip = Number(e.target.value);
    setTipAmount(tip >= 0 ? tip : 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      donorId,
      donationAmount,
      tipAmount,
      ...formData,
    };

    if(!donorId){
      alert("Error: Donor ID is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/donation-form/${donationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(donationData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Donation recorded successfully!");
        window.location.href = "/"; // Redirect after donation
      } else {
         alert("Failed to submit form: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  if (!donorId) {
    alert("You must be logged in as a Donor to proceed.");
    return null;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Donate Now</h2>

      {/* Donation Amount Selection */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Select Donation Amount:</p>
        <div className="grid grid-cols-3 gap-3">
          {[1000, 2500, 10000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                donationAmount === amount
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>

        {/* Other Amount */}
        <button
          onClick={() => setIsCustom(true)}
          className={`mt-3 px-4 py-2 rounded-lg border ${
            isCustom ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-600"
          }`}
        >
          Other Amount
        </button>

        {isCustom && (
          <input
            type="number"
            min="10"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
            placeholder="Enter Amount (Min ₹10)"
          />
        )}
      </div>

      {/* Tip Selection */}
      <div className="mb-4">
        <label className="block font-medium">Platform Tip (4% Suggested)</label>
        <input
          type="number"
          value={tipAmount}
          onChange={handleTipChange}
          className="w-full mt-1 px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Donor Information */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "donorName", label: "Full Name", type: "text" },
          { name: "mobileNumber", label: "Mobile Number", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "billingAddress", label: "Billing Address", type: "text" },
          { name: "pincode", label: "Pincode", type: "text" },
          { name: "panNumber", label: "PAN Number (Required for Tax Exemption)", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={name !== "panNumber"}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>
        ))}

        {/* Proceed to Pay Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Proceed to Pay ₹{donationAmount + tipAmount}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;