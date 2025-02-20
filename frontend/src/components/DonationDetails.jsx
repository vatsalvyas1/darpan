import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  
    fetchDonation();
  }, [id]);  

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-2xl text-gray-600 font-medium">Loading...</div>
      </div>
    </div>
  );
  
  if (!donation) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-gray-50">
      <div className="text-2xl text-gray-600 font-medium bg-white p-8 rounded-2xl shadow-lg">
        Donation not found.
      </div>
    </div>
  );

  const progressPercentage = (donation.amountRaised / donation.donationGoal) * 100;


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: donation.title,
          text: donation.story,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header Section */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4 mr-2" />
            Started on {new Date(donation.createdAt).toLocaleDateString()}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">{donation.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Help us make a difference in someone's life today.</p>
        </div>

        {/* Combined Media and Progress Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
          {/* Image Section */}
          <div className="relative h-[500px]">
            {donation.images.length > 0 ? (
              <img 
                src={donation.images[0]} 
                alt={donation.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No image available</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Progress Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
              <div className="space-y-2">
                <p className="text-5xl font-bold">₹{donation.amountRaised.toLocaleString()}</p>
                <p className="text-xl opacity-90">raised of ₹{donation.donationGoal.toLocaleString()} goal</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto backdrop-blur-sm bg-opacity-90">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Donate Now</span>
                </button>
                <button onClick={handleShare} className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto cursor-pointer backdrop-blur-sm">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-500 relative"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-white/90">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{donation.numberOfDonors} generous donors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>{Math.round(progressPercentage)}% of goal reached</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Video Section */}
      {donation.videoLink ? (
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
      ) : null}

      {/* Image Section */}
      <div className="mt-6">
        {donation.images.length > 0 ? (
          <img src={donation.images[0]} alt={donation.title} className="w-full h-auto rounded-lg shadow-md" />
        ) : (
          <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        {/* Organizer Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center text-white">
              <span className="text-2xl font-semibold">
                {donation.organizedBy.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Campaign Organizer</p>
              <p className="text-lg text-gray-600">{donation.organizedBy}</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {donation.story.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center space-y-6 py-8">
          <p className="text-2xl font-medium text-gray-600">Every donation makes a difference.</p>
          <button className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl text-lg font-medium">
            <Heart className="w-6 h-6" />
            <span>Make a Donation</span>
          </button>
        </div>
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