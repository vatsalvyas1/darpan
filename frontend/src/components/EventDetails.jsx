import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`); // Adjust API endpoint if needed
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

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!event) return <p className="text-center text-lg">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
      <p className="text-lg text-gray-600">Organized by {event.organizerName}</p>

      {/* Image Section */}
      <div className="mt-6">
        {event.images.length > 0 ? (
          <img src={event.images[0]} alt={event.title} className="w-full h-auto rounded-lg shadow-md" />
        ) : (
          <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Event Timing */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-bold text-gray-700">
          📅 {new Date(event.when.from).toLocaleDateString()} - {new Date(event.when.to).toLocaleDateString()}
        </p>
      </div>

      {/* Event Website */}
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

      {/* Event Location Link */}
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

      {/* Why Join Us */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Join Us?</h2>
        <p className="text-gray-700">{event.whyJoinUs}</p>
      </div>

      {/* Join WhatsApp Group */}
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
    </div>
  );
};

export default EventDetails;