import { useState } from "react";

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    title: "",
    organizedBy: "",
    nameOfPerson: "",
    story: "",
    donationGoal: "",
    images: [],
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Creating FormData object for file uploads
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => data.append("images", image));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Donation created successfully!");
        setFormData({
          title: "",
          organizedBy: "",
          nameOfPerson: "",
          story: "",
          donationGoal: "",
          images: [],
          accountHolderName: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          upiId: "",
        });
      } else {
        alert(result.message || "Error creating donation");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create a Donation Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
\        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Donation Title"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="organizedBy"
          value={formData.organizedBy}
          onChange={handleChange}
          placeholder="Organized By"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="nameOfPerson"
          value={formData.nameOfPerson}
          onChange={handleChange}
          placeholder="Beneficiary Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="story"
          value={formData.story}
          onChange={handleChange}
          placeholder="Why is this donation needed?"
          rows="4"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        <input
          type="number"
          name="donationGoal"
          value={formData.donationGoal}
          onChange={handleChange}
          placeholder="Donation Goal Amount (₹)"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <h3 className="text-xl font-semibold mt-4">Account Details</h3>

        <input
          type="text"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          placeholder="Account Holder Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          placeholder="IFSC Code"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="upiId"
          value={formData.upiId}
          onChange={handleChange}
          placeholder="UPI ID (Optional)"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create Donation Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
