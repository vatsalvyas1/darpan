import React from 'react';
import { Heart, Calendar, DollarSign, ExternalLink, IndianRupeeIcon } from 'lucide-react';

const DonorProfile = ({ profile }) => {
  if (!profile || !profile.donor) {
    return <p>Loading donor profile...</p>; 
  }

  return (
    <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-3xl font-bold text-gray-900">Donor Details</h3>
        <div className="mt-4 space-y-2">
          <p className="text-lg"><span className="font-medium text-gray-700">Name:</span> {profile.donor.name}</p>
          <p className="text-lg">
            <span className="font-medium text-gray-700">Preferred Causes:</span>
            <span className="ml-2">
              {profile.donor.preferredCauses?.map((cause, index) => (
                <span key={cause} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mr-2">
                  {cause}
                </span>
              )) || "None"}
            </span>
          </p>
        </div>
      </div>

      {/* Donations Made */}
      {profile.donor.donationsMade?.length > 0 ? (
        <div className="mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="w-7 h-7 text-rose-500" />
            <h3 className="text-2xl font-bold text-gray-900">Donations Made</h3>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.donor.donationsMade.map(donation => (
              <div 
                key={donation._id} 
                className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={donation.donationId?.images?.[0] || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"} 
                    alt={donation.donationId?.title || "Donation Cause"} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-emerald-600">
                      <IndianRupeeIcon className="w-5 h-5" />
                      <span className="font-bold">{donation.donationAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(donation.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {donation.donationId?.title || "Unknown Cause"}
                  </h4>

                  <div className="flex items-center justify-between">
                    <button className="inline-flex items-center space-x-1 text-sm font-medium text-purple-600 hover:text-purple-800">
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No donations made yet.</p>
        </div>
      )}
    </div>
  );
}

export default DonorProfile;