const DonorProfile = ({ profile }) => {
  if (!profile || !profile.donor) {
    return <p>Loading donor profile...</p>; // Fallback if profile is not yet loaded
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium">Donor Details</h3>
      <p><strong>Name:</strong> {profile.donor.name}</p>
      <p><strong>Preferred Causes:</strong> {profile.donor.preferredCauses?.join(", ") || "None"}</p>

      {/* Donations Made */}
      {profile.donor.donations?.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-medium">Donations Made</h3>
          <ul className="list-disc ml-6">
            {profile.donor.donations.map(donation => (
              <li key={donation._id}>{donation.title} - ₹{donation.amount}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No donations made yet.</p>
      )}
    </div>
  );
};

export default DonorProfile;
