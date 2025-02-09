import { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import EventList from "./EventList";

const NgoProfile = ({ profile }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (profile && profile.ngo) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/events/ngo/${profile.ngo.userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchEvents();
    }
  }, [profile]);

  if (!profile || !profile.ngo) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium">NGO Details</h3>
      <p><strong>NGO Name:</strong> {profile.ngo.name}</p>
      <p><strong>Registration No:</strong> {profile.ngo.registrationNumber}</p>

      {/* Events Hosted by NGO */}
      {events.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-medium">Events Hosted by You</h3>
          <EventList events={events} />
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No events hosted yet.</p>
      )}

      {/* Donations Organized by NGO */}
      {profile.ngo.donations && profile.ngo.donations.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-medium">Donations Organized by You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.ngo.donations.map((donation) => (
              <DonationCard key={donation._id} {...donation} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No donations organized yet.</p>
      )}
    </div>
  );
};

export default NgoProfile;
