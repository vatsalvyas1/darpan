import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDonor, setIsDonor] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0); 

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url; 
  };

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/donations/${id}`);
        if (!response.ok) throw new Error("Donation not found");
        const data = await response.json();
        setDonation(data);
      } catch (error) {
        console.error("Error fetching donation details:", error);
        setDonation(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile", { credentials: "include" });
        if (!response.ok) throw new Error("User not logged in");
        const data = await response.json();
        setUser(data);


        // Check if the user is a donor
        if (data.role === "Donor") {
          const checkResponse = await fetch(`http://localhost:5000/api/donation-form/check-registration/${id}/${data.user._id}`, {
            credentials: "include",
          });

          const checkData = await checkResponse.json();
          setIsDonor(true);
          setDonationAmount(checkData.donationAmount)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchDonation();
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!donation) return <p className="text-center text-lg">Donation not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{donation.title}</h1>
      <p className="text-lg text-gray-600">Campaign by {donation.organizedBy}</p>

      {/* Video Section */}
      {donation.videoLink && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="400"
            src={getEmbedUrl(donation.videoLink)}
            title="Donation Video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}

      {/* Image Section */}
      <div className="mt-6">
        {donation.images.length > 0 ? (
          <img src={donation.images[0]} alt={donation.title} className="w-full h-auto rounded-lg shadow-md" />
        ) : (
          <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Donation Progress */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-bold text-gray-700">
          ₹{donation.amountRaised} raised of ₹{donation.donationGoal}
        </p>
        <div className="relative w-full bg-gray-300 h-4 rounded-md mt-2">
          <div
            className="absolute top-0 left-0 h-4 bg-green-500 rounded-md"
            style={{ width: `${(donation.amountRaised / donation.donationGoal) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{donation.numberOfDonors} people have donated</p>
      </div>

      {/* Story Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Story</h2>
        <p className="text-gray-700">{donation.story}</p>
      </div>

      {/* Donation Message or Donate Now Button */}
      <div className="mt-6 flex justify-center">
  {user?.role === "Donor" && isDonor && donationAmount > 0 ? (
    <p className="text-lg text-green-600 font-semibold">
      Thanks for donating ₹{donationAmount}! Want to donate more?
      <button
        onClick={() => navigate(`/donation-form/${id}`)}
        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Donate Again
      </button>
    </p>
  ) : user?.role === "Donor" ? (
    <button
      onClick={() => navigate(`/donation-form/${id}`)}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700"
    >
      Donate Now
    </button>
  ) : null}
</div>

    </div>
  );
};

export default DonationDetails;