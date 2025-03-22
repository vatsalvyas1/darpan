import { useState } from "react";
import { Heart, Users, Video, Image, Wallet, Building, CreditCard, QrCode } from 'lucide-react';
import DonationCard from "./DonationCard";
import { backendUrl } from "../constant";

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
        upiId: formData.upiId || "",
      },
    };
  
    try {
      const response = await fetch(`${backendUrl}/api/donations`, {
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 py-8 px-8">
            <h2 className="text-4xl font-bold text-white text-center tracking-tight">Create a Donation Campaign</h2>
            <p className="text-rose-100 text-center mt-2">Help make a difference in someone's life</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Campaign Details Section */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Details</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Donation Title"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="organizedBy"
                      value={formData.organizedBy}
                      onChange={handleChange}
                      placeholder="Organized By"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="nameOfPerson"
                      value={formData.nameOfPerson}
                      onChange={handleChange}
                      placeholder="Beneficiary Name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Why is this donation needed?"
                  rows="4"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none"
                  required
                ></textarea>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      name="donationGoal"
                      value={formData.donationGoal}
                      onChange={handleChange}
                      placeholder="Donation Goal Amount (₹)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Video className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="videoLink"
                      value={formData.videoLink}
                      onChange={handleChange}
                      placeholder="Video Link (Optional)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300
                             file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                             file:text-sm file:font-semibold file:bg-red-50 
                             file:text-red-700 hover:file:bg-red-100"
                  />
                </div>
              </div>
            </div>

            {/* Account Details Section */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      placeholder="Account Holder Name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      placeholder="Bank Name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="Account Number"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="IFSC Code"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <QrCode className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="UPI ID (Optional)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
                <p className="text-red-600 mt-3 font-medium">Uploading images...</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 px-8 rounded-xl
                         font-semibold text-lg hover:from-red-700 hover:to-rose-700
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Donation Campaign"}
            </button>
          </form>
        </div>

        {createdDonation && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Created Donation</h3>
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <DonationCard
                title={createdDonation.title}
                organizedBy={createdDonation.organizedBy}
                images={createdDonation.images}
                amountRaised={createdDonation.amountRaised}
                donationGoal={createdDonation.donationGoal}
                numberOfDonors={createdDonation.numberOfDonors}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDonation;