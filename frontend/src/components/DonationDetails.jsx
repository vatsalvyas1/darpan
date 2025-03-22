import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Target, 
  Clock,
  Share2, 
  AlertCircle,
  Shield,
  ChevronRight
} from "lucide-react";
import { backendUrl } from "../constant";

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

  // Fetch donation details
  const fetchDonation = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/donations/${id}`);
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

  // Fetch user details and check donation status
  const fetchUser = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/profile`, { credentials: "include" });
      if (!response.ok) throw new Error("User not logged in");
      const data = await response.json();
      setUser(data);

      if (data.role === "Donor") {
        const checkResponse = await fetch(
          `${backendUrl}/api/donation-form/check-registration/${id}/${data.user._id}`,
          { credentials: "include" }
        );
        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          setIsDonor(true);
          setDonationAmount(checkData.donationAmount);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchDonation();
    fetchUser();
  }, [id]);  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gradient-to-r from-blue-300 to-blue-400 rounded"></div>
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Donation Not Found</h2>
          <p className="text-slate-600">The donation you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const progress = (donation.amountRaised / donation.donationGoal) * 100;
  const formattedProgress = Math.min(progress, 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Story */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {donation.images.length > 0 ? (
                <img
                  src={donation.images[0]}
                  alt={donation.title}
                  className="w-full h-[400px] sm:h-[500px] object-contain"
                />
              ) : (
                <div className="w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Heart className="h-32 w-32 text-white opacity-50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg mb-4">
                  <Shield className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-slate-900">Verified Campaign</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  {donation.title}
                </h1>
                <p className="text-lg text-white/90">
                  Organized by {donation.organizedBy}
                </p>
              </div>
            </div>

            {/* Video Section */}
            {donation.videoLink && (
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                <iframe
                  src={getEmbedUrl(donation.videoLink)}
                  title="Campaign Video"
                  className="w-full aspect-video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Story Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About this campaign</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {donation.story}
              </p>
            </div>
          </div>

          {/* Right Column - Donation Info and CTA */}
          <div className="lg:pl-8">
            <div className="sticky top-8 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <Target className="h-8 w-8 text-blue-500 mb-3" />
                  <p className="text-2xl font-bold text-slate-900">₹{donation.donationGoal.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Goal Amount</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <Heart className="h-8 w-8 text-rose-500 mb-3" />
                  <p className="text-2xl font-bold text-slate-900">₹{donation.amountRaised.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Raised So Far</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <Clock className="h-8 w-8 text-emerald-500 mb-3" />
                  <p className="text-2xl font-bold text-slate-900">{donation.numberOfDonors.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Donors Donated</p>
                </div>
              </div>

              {/* Main Donation Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                {/* Progress Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <p className="text-3xl font-bold text-slate-900">₹{donation.amountRaised.toLocaleString()}</p>
                      <p className="text-sm text-slate-600 mt-1">raised of ₹{donation.donationGoal.toLocaleString()} goal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">{formattedProgress}%</p>
                      <p className="text-sm text-slate-600 mt-1">{donation.numberOfDonors} donors</p>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                      style={{ width: `${formattedProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* CTA Section */}
                {user?.role === "Donor" && isDonor && donationAmount > 0 ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                      <Heart className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                      <p className="text-center text-blue-900 font-medium">
                        Thank you for your donation of ₹{donationAmount.toLocaleString()}!
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/donation-form/${id}`)}
                      className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transform transition-all duration-200 hover:shadow-xl flex items-center justify-center group"
                    >
                      Donate Again
                      <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : user?.role === "Donor" ? (
                  <button
                    onClick={() => navigate(`/donation-form/${id}`)}
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transform transition-all duration-200 hover:shadow-xl flex items-center justify-center group"
                  >
                    Donate Now
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : null}

                {/* Share Button */}
                <button className="w-full mt-4 flex items-center justify-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors py-4 rounded-xl border-2 border-slate-100 hover:border-blue-100 font-medium">
                  <Share2 className="h-5 w-5" />
                  <span>Share this campaign</span>
                </button>

                {/* Trust Indicator */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-center space-x-2 text-slate-600">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;