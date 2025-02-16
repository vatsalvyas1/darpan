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
       
        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          NGO Details
        </h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong className="text-gray-800 font-medium">Name:</strong> 
            <span className="ml-2">{profile.ngo.name}</span>
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-800 font-medium">Registration No:</strong>
            <span className="ml-2 font-mono">{profile.ngo.registrationNumber}</span>
          </p>
        </div>

      {/* Events Hosted by NGO */}
      {events.length > 0 ? (
        <div className="mt-4">
          <EventList events={events} />
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No events hosted yet.</p>
      )}

      {/* Donations Organized by NGO */}
      {profile.ngo.donations && profile.ngo.donations.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-3xl mb-4 flex justify-center font-bold">Donations Organized by You</h3>
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
