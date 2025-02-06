import { useState } from "react";
import DonationCard from "./DonationCard";

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    ngoId:"",
    title: "",
    organizedBy: "",
    nameOfPerson: "",
    story: "",
    donationGoal: "",
    images: [], 
    videoLink: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  const [createdDonation, setCreatedDonation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    const uploadedImages = [];

    for (const file of files) {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "darpan"); 
      imageData.append("cloud_name", "dhrhfuzb0"); 

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dhrhfuzb0/image/upload", {
          method: "POST",
          body: imageData,
        });

        const data = await response.json();
        if (response.ok) {
          uploadedImages.push(data.secure_url);
        } else {
          console.error("Cloudinary Upload Error:", data.error.message);
        }
      } catch (error) {
        console.error("Upload Failed:", error);
      }
    }

    setFormData((prev) => ({ ...prev, images: uploadedImages }));
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (
      !formData.title ||
      !formData.organizedBy ||
      !formData.nameOfPerson ||
      !formData.story ||
      !formData.donationGoal ||
      !formData.accountHolderName ||
      !formData.bankName ||
      !formData.accountNumber ||
      !formData.ifscCode
    ) {
      alert("Please fill out all required fields.");
      return;
    }
  
    const donationData = {
      ngoId: formData.ngoId,
      title: formData.title,
      organizedBy: formData.organizedBy,
      nameOfPerson: formData.nameOfPerson,
      story: formData.story,
      donationGoal: parseFloat(formData.donationGoal),
      images: formData.images,
      videoLink: formData.videoLink,
      accountDetails: {
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        upiId: formData.upiId || "", // Optional field
      },
    };
  
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Donation created successfully!");
  
        setCreatedDonation({
          _id: result.donation._id, 
          title: formData.title,
          organizedBy: formData.organizedBy,
          images: formData.images,
          amountRaised: 0,
          donationGoal: parseFloat(formData.donationGoal),
          numberOfDonors: 0,
        });
  
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
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Donation Title" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="text" name="organizedBy" value={formData.organizedBy} onChange={handleChange} placeholder="Organized By" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="text" name="nameOfPerson" value={formData.nameOfPerson} onChange={handleChange} placeholder="Beneficiary Name" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <textarea name="story" value={formData.story} onChange={handleChange} placeholder="Why is this donation needed?" rows="4" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required></textarea>

        <input type="number" name="donationGoal" value={formData.donationGoal} onChange={handleChange} placeholder="Donation Goal Amount (₹)" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />

        <input type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} placeholder="Video Link (Optional)" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />

        {loading && <p className="text-center text-blue-500">Uploading images...</p>}

        <h3 className="text-xl font-semibold mt-4">Account Details</h3>

        <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} placeholder="Account Holder Name" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />

        <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="UPI ID (Optional)" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300" disabled={loading}>
          {loading ? "Creating..." : "Create Donation Campaign"}
        </button>
      </form>

      {createdDonation && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Created Donation</h3>
          <DonationCard title={createdDonation.title} organizedBy={createdDonation.organizedBy} images={createdDonation.images} amountRaised={createdDonation.amountRaised} donationGoal={createdDonation.donationGoal} numberOfDonors={createdDonation.numberOfDonors} />
        </div>
      )}
    </div>
  );
};

export default CreateDonation;
