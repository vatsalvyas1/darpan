import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) throw new Error("Event not found");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile", { credentials: "include" });
        if (!response.ok) throw new Error("User not logged in");
        const data = await response.json();
        setUser(data);

        // Check if the user is a volunteer and already registered
        if (data.role === "Volunteer") {
          const checkResponse = await fetch(`http://localhost:5000/api/event-form/check-registration/${id}/${data.user._id}`, {
            credentials: "include",
          });
          
          const checkData = await checkResponse.json();
          setIsRegistered(checkData.isRegistered);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchEvent();
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!event) return <p className="text-center text-lg">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
      <p className="text-lg text-gray-600">Organized by {event.organizerName}</p>

      <div className="mt-6">
        {event.images.length > 0 ? (
          <img src={event.images[0]} alt={event.title} className="w-full h-auto rounded-lg shadow-md" />
        ) : (
          <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-bold text-gray-700">
          📅 {new Date(event.when.from).toLocaleDateString()} - {new Date(event.when.to).toLocaleDateString()}
        </p>
      </div>

      {event.website && (
        <div className="p-6 text-center">
          <a 
            href={event.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition inline-block"
          >
            Visit Website
          </a>
        </div>
      )}

      {event.locationLink && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Location</h2>
          <a
            href={event.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            View Location on Maps
          </a>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Join Us?</h2>
        <p className="text-gray-700">{event.whyJoinUs}</p>
      </div>

      {event.whatsappGroupLink && (
        <div className="mt-6">
          <a
            href={event.whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold block text-center w-full hover:bg-green-700 transition"
          >
            Join WhatsApp Group
          </a>
        </div>
      )}

      {/* Show Join Event Button if user is a volunteer */}
      {user?.role === "Volunteer" && (
        <div className="mt-6">
          {isRegistered ? (
            <button className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold w-full" disabled>
              You have already registered for this event
            </button>
          ) : (
            <button
              onClick={() => navigate(`/event-form/${id}`)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-blue-600 transition"
            >
              Join Event
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
