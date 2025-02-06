import React from "react";
import { Link } from "react-router-dom";

const DonationCard = ({ _id, title, organizedBy, images, amountRaised, donationGoal, numberOfDonors }) => {
  const amountLeft = donationGoal - amountRaised;
  const progressPercentage = ((amountRaised / donationGoal) * 100).toFixed(2);

  return (
    <div className="w-[400px] h-[500px] p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
        {/* Image & Title Section (Clickable) */}
        <Link to={`/donation/${_id}`} className="h-[60%]">
          <div className="relative h-full">
            {images?.length > 0 ? (
              <img
                src={images[0]} 
                alt={title}
                className="w-full h-full object-cover transition-all duration-300 hover:brightness-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
                Tax Benefits Available
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white">
                <p className="text-sm font-medium italic mb-1">Organized by: {organizedBy}</p>
                <h2 className="text-lg font-bold">{title}</h2>
              </div>
            </div>
          </div>
        </Link>

        {/* Progress and Donation Details Section */}
        <div className="flex flex-col justify-between p-4 h-[40%]">
          <div className="flex items-center gap-4">
            {/* Circular Progress Bar */}
            <div className="relative h-14 w-14">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#ddd" strokeWidth="6" fill="none" />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#FF6B6B"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="150.8"
                  strokeDashoffset={150.8 - (progressPercentage / 100) * 150.8}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                {progressPercentage}%
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-rose-500">₹{amountRaised}</span>
                <span className="text-gray-600">raised,</span>
                <span className="text-gray-900 font-medium">₹{amountLeft} left</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>{numberOfDonors} Donations</span>
              </div>
            </div>
          </div>

          {/* Donate Now Button */}
          <div className="text-center">
            <Link to={`/donation/${_id}`}>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold text-lg shadow-md transition-all duration-200 hover:bg-red-600 w-full">
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
