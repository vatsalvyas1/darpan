import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" }) // Ensures cookies are sent
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold">My Profile</h2>
      {profile && (
        <div>
          <p><strong>Name:</strong> {profile.user.name}</p>
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Role:</strong> {profile.user.role}</p>

          {profile.ngo && (
            <div>
              <h3 className="text-xl font-medium mt-4">NGO Details</h3>
              <p><strong>NGO Name:</strong> {profile.ngo.name}</p>
              <p><strong>Registration No:</strong> {profile.ngo.registrationNumber}</p>
            </div>
          )}

          {profile.volunteer && (
            <div>
              <h3 className="text-xl font-medium mt-4">Volunteer Details</h3>
              <p><strong>Age:</strong> {profile.volunteer.age}</p>
              <p><strong>Interests:</strong> {profile.volunteer.interests.join(", ")}</p>
            </div>
          )}

          {profile.donor && (
            <div>
              <h3 className="text-xl font-medium mt-4">Donor Details</h3>
              <p><strong>Preferred Causes:</strong> {profile.donor.preferredCauses.join(", ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
