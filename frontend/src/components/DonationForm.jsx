import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, CreditCard, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
import { backendUrl } from "../constant";

function DonationForm() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const predefinedAmounts = [2500, 5000, 10000];

  // Fetch user details to check if the user is a donor
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/me`, {
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
    setTipAmount(Math.round(amount * 0.04));
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
      const response = await fetch(`${backendUrl}/api/donation-form/${donationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(donationData, donationAmount), 
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
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center"
      style={{
        backgroundImage: `
          radial-gradient(circle at 100% 100%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 0% 0%, rgba(219, 39, 119, 0.1) 0%, transparent 50%)
        `
      }}
    >
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4 shadow-lg shadow-indigo-500/25">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Make a Difference Today
          </h1>
          <p className="mt-2 text-gray-600">Your generosity creates ripples of positive change</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-indigo-500/10 overflow-hidden border border-indigo-50">
          <div className="p-8">
            {step === 1 ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold text-gray-800">
                      Select Your Impact Level
                    </label>
                    <div className="flex items-center text-indigo-600">
                      <Sparkles className="w-4 h-4 mr-1" />
                      <span className="text-sm">Most Popular</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {predefinedAmounts.map((amount, index) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`
                          relative group overflow-hidden
                          px-4 py-6 rounded-2xl font-medium transition-all duration-300
                          ${donationAmount === amount
                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-2 ring-indigo-600 ring-offset-2"
                            : "bg-white hover:bg-indigo-50 text-gray-800 border-2 border-indigo-100 hover:border-indigo-200"
                          }
                        `}
                      >
                        <div className="relative z-10">
                          <div className="text-2xl font-bold mb-1">₹{amount.toLocaleString()}</div>
                          <div className="text-xs opacity-80">
                            {index === 0 ? "Supporter" : index === 1 ? "Champion" : "Visionary"}
                          </div>
                        </div>
                        {donationAmount === amount && (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCustom(true)}
                    className={`
                      w-full mt-4 px-6 py-4 rounded-2xl transition-all duration-300
                      ${isCustom
                        ? "bg-indigo-50 border-2 border-indigo-200 text-indigo-700"
                        : "bg-white border-2 border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50"
                      }
                    `}
                  >
                    Custom Amount
                  </button>

                  {isCustom && (
                    <div className="mt-4">
                      <input
                        type="number"
                        min="10"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full px-6 py-4 text-lg border-2 border-indigo-200 rounded-2xl focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
                        placeholder="Enter Amount (Min ₹10)"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-gray-800">
                    Support Our Mission
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={tipAmount}
                      onChange={handleTipChange}
                      className="w-full px-6 py-4 text-lg border-2 border-indigo-200 rounded-2xl focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-indigo-600 font-medium">
                      Suggested: 4%
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    This small contribution helps us maintain our platform and reach more people in need
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure payment powered by Cashfree</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "donorName", label: "Full Name", type: "text", span: true },
                    { name: "email", label: "Email", type: "email", span: true },
                    { name: "mobileNumber", label: "Mobile Number", type: "tel" },
                    { name: "pincode", label: "Pincode", type: "text" },
                    { name: "billingAddress", label: "Billing Address", type: "text", span: true },
                    { name: "panNumber", label: "PAN Number", type: "text", span: true, optional: true },
                  ].map(({ name, label, type, span, optional }) => (
                    <div key={name} className={span ? "col-span-2" : ""}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                        {optional && <span className="text-indigo-400 text-xs ml-1">(Optional)</span>}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required={!optional}
                        className="w-full px-6 py-4 border-2 border-indigo-100 rounded-xl focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Your Generous Contribution</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Donation: ₹{donationAmount.toLocaleString()}<br />
                        Platform Support: ₹{tipAmount.toLocaleString()}<br />
                        <span className="font-medium text-indigo-600">
                          Total Impact: ₹{(donationAmount + tipAmount).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-4 border-2 border-indigo-200 rounded-xl font-medium hover:bg-indigo-50 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                      flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 
                      text-white py-4 rounded-xl font-medium 
                      hover:from-indigo-700 hover:to-purple-700
                      transition-all duration-300
                      flex items-center justify-center space-x-2
                      ${isLoading ? "opacity-75 cursor-not-allowed" : ""}
                    `}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Complete Donation</span>
                        <Heart className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>Your donation is eligible for tax benefits under 80G</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationForm;