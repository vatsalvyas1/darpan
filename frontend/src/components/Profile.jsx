import { useEffect, useState } from "react";
import NgoProfile from "./NgoProfile";
import VolunteerProfile from "./VolunteerProfile";
import DonorProfile from "./DonorProfile";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch("/api/profile", { credentials: "include" });
        if (!profileResponse.ok) throw new Error("Failed to fetch profile");
        
        const profileData = await profileResponse.json();
        const userId = profileData.user._id; // Use userId instead of ngoId

        if (profileData.user.role === "NGO" && userId.match(/^[0-9a-fA-F]{24}$/)) { 
          // Fetch events and donations only if userId is valid and role is NGO
          const [eventsResponse, donationsResponse] = await Promise.all([
            fetch(`/api/events/ngo/${userId}`),
            fetch(`/api/donations/ngo/${userId}`)
          ]);

          const events = eventsResponse.ok ? await eventsResponse.json() : [];
          const donations = donationsResponse.ok ? await donationsResponse.json() : [];

          profileData.ngo = { ...profileData.ngo, events, donations };
        }

        setProfile(profileData);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
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
        </div>
      )}

      {/* Render based on user role */}
      {profile && profile.user.role === "NGO" && <NgoProfile profile={profile} />}
      {profile && profile.user.role === "Volunteer" && <VolunteerProfile profile={profile} />}
      {profile && profile.user.role === "Donor" && <DonorProfile profile={profile} />}
    </div>
  );
};

export default Profile;