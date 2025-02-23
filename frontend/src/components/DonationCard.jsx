import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, ArrowRight } from "lucide-react";

const DonationCard = ({ _id, title, organizedBy, images, amountRaised, donationGoal, numberOfDonors }) => {
  const [isHovered, setIsHovered] = useState(false);
  const amountLeft = donationGoal - amountRaised;
  const progressPercentage = ((amountRaised / donationGoal) * 100).toFixed(1);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="w-[400px] h-[500px] p-4 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-2xl shadow-lg transition-all duration-500 h-full transform-gpu group hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1">
        {/* Image & Title Section */}
        <Link to={`/donation/${_id}`} className="block h-[60%] relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          {images?.length > 0 ? (
            <img
              src={images[0]} 
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-110' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-medium">No Image Available</span>
            </div>
          )}

          {/* Tax Benefits Badge */}
          <div className="absolute top-4 left-4 z-20 transition-transform duration-300 group-hover:translate-y-1">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-full" />
              <span className="relative bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1.5 rounded-full text-sm font-medium text-white shadow-lg">
                Tax Benefits
              </span>
            </div>
          </div>

          {/* Title and Organizer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <p className="text-orange-300 text-sm font-medium mb-2 flex items-center gap-2">
              <Users size={14} className="animate-pulse" />
              {organizedBy}
            </p>
            <h2 className="text-2xl font-bold text-white leading-tight">{title}</h2>
          </div>
        </Link>

        {/* Progress and Details Section */}
        <div className="p-6 h-[40%] flex flex-col justify-between">
          {/* Progress Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Animated Progress Ring */}
                <div className="relative h-14 w-14 transform transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="28" 
                      cy="28" 
                      r="24" 
                      className="stroke-gray-200" 
                      strokeWidth="6" 
                      fill="none" 
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      className="stroke-rose-500 transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="150.8"
                      strokeDashoffset={150.8 - (progressPercentage / 100) * 150.8}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                      {progressPercentage}%
                    </span>
                  </div>
                </div>

                {/* Amount Details */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                      {formatCurrency(amountRaised)}
                    </span>
                    <span className="text-gray-500 text-sm">raised of</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(donationGoal)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Heart size={14} className="text-rose-400" />
                    <span className="text-sm">{numberOfDonors} generous donors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Donate Button */}
          <Link 
            to={`/donation/${_id}`}
            className="block group/btn"
          >
            <button className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 p-px font-medium text-white transition-all duration-300 hover:shadow-[0_8px_16px_rgba(251,113,133,0.4)]">
              <div className="relative bg-white px-6 py-3 rounded-[11px] transition-all duration-300 group-hover/btn:bg-transparent">
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent transition-all duration-300 group-hover/btn:text-white">
                    Donate Now
                  </span>
                  <ArrowRight 
                    size={16} 
                    className="text-rose-500 transition-all duration-300 group-hover/btn:text-white group-hover/btn:translate-x-1" 
                  />
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;