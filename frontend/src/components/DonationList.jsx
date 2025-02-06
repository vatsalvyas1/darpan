import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DonationCard from "./DonationCard";

const DonationList = ({ donations }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the total number of pages
  const totalPages = Math.ceil(donations.length / itemsPerPage);

  // Get donations for the current page
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = donations.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center mb-5 gap-6">
        <div className="text-center">
        <h1 className="text-4xl font-bold p-[1.5rem] text-[#222]">Donation Events</h1>
        <p className="font-normal flex justify-self-center max-w-[400px] text-[#666]">
          Create sustained impact. Support verified projects. Get regular updates. Save tax. Cancel anytime.
        </p>
      </div>
      {/* Render Donation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentDonations.map((donation) => (
          <DonationCard key={donation._id} {...donation} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-4 mt-6">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`p-2 border rounded-lg ${
              page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  page === index + 1 ? "bg-red-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`p-2 border rounded-lg ${
              page === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationList;
