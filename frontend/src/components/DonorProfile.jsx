const DonorProfile = ({ profile }) => {
  if (!profile || !profile.donor) {
    return <p>Loading donor profile...</p>; 
  }

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold">Donor Details</h3>
      <p><strong>Name:</strong> {profile.donor.name}</p>
      <p><strong>Preferred Causes:</strong> {profile.donor.preferredCauses?.join(", ") || "None"}</p>

      {/* Donations Made */}
      {profile.donor.donationsMade?.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-xl font-medium">Donations Made</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.donor.donationsMade.map(donation => (
              <div key={donation._id} className="p-4 border rounded-lg shadow-md bg-white">
                {/* Donation Cause Image */}
                <img 
                  src={donation.donationId?.images?.[0] || "/placeholder.jpg"} 
                  alt={donation.donationId?.title || "Donation Cause"} 
                  className="w-full h-40 object-cover rounded-md"
                />

                {/* Donation Cause Title */}
                <h4 className="text-lg font-semibold mt-2">
                  {donation.donationId?.title || "Unknown Cause"}
                </h4>

                <p className="text-gray-700">Amount: ₹{donation.donationAmount}</p>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No donations made yet.</p>
      )}
    </div>
  )
}

export default DonorProfile;
