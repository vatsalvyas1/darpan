import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, ExternalLink, MessageCircle } from 'lucide-react';

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-white">
      <div className="space-x-2 flex">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-white">
      <p className="text-xl text-gray-600 font-medium">Event not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative h-[600px]">
        {event.images.length > 0 ? (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
              <h1 className="text-6xl  font-bold mb-4 text-center tracking-tight drop-shadow-lg max-w-4xl">
                <p className="text-[30px] font-light font-serif mb-2">Mission</p>
                 {event.title}
              </h1>
              <p className="text-2xl mb-6 opacity-90 drop-shadow font-light">
                Organized by <span className="font-semibold ">{event.organizerName}</span>
              </p>
              <div className="inline-block px-8 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8">
                <p className="text-xl font-medium">
                  {new Date(event.when.from).toLocaleDateString()} - {new Date(event.when.to).toLocaleDateString()}
                </p>
              </div>
              
              {user?.role === "Volunteer" && (
                <div className="mt-4">
                  {isRegistered ? (
                    <div className="px-8 py-3    text-white text-lg font-medium">
                      You have Already Registered in this Event
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/event-form/${id}`)}
                      className="px-8 py-3 bg-[#4c4b4b] hover:bg-gray-400 cursor-pointer rounded-4xl text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl "
                    >
                      Join Event
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <p className="text-white text-xl">No Image Available</p>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div className="bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
            Why Join Us?
          </h2>
          <p className="text-gray-700 leading-relaxed text-xl">{event.whyJoinUs}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {event.locationLink && (
            <a
              href={event.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium text-gray-800">View Location</span>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
            </a>
          )}

          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <ExternalLink className="w-6 h-6 text-purple-600" />
                <span className="text-lg font-medium text-gray-800">Visit Website</span>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
            </a>
          )}
        </div>

        {event.whatsappGroupLink && (
          <a
            href={event.whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Join WhatsApp Group</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default EventDetails;