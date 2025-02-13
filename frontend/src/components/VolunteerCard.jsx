import { useNavigate } from "react-router-dom";

export default function VolunteerCard({ event }) {
  const navigate = useNavigate(); // Get the navigate function

  if (!event || !event._id) return null; // Ensure valid event before rendering

  return (
    <div className="group bg-white shadow-lg rounded-3xl overflow-hidden transition-transform hover:scale-105 flex flex-col h-[400px] relative">
      {/* Event Image */}
      <div className="relative h-[250px] w-full">
        <img
          src={event?.images?.[0] || "https://via.placeholder.com/300"}
          alt={event?.title || "Event Image"}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h2 className="text-white text-xl font-bold">{event?.title || "Untitled Event"}</h2>
        </div>
      </div>

      {/* Event Info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-800 text-sm flex-grow">{event?.whyJoinUs || "No details available."}</p>
        <p className="text-gray-600 mt-2">
          <strong>From:</strong> {event?.when?.from ? new Date(event.when.from).toLocaleDateString() : "N/A"} <br />
          <strong>To:</strong> {event?.when?.to ? new Date(event.when.to).toLocaleDateString() : "N/A"}
        </p>
      </div>

      {/* Hover Button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/event/${event?._id}`);
          }}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform cursor-pointer"
        >
          Volunteer Now
        </button>
      </div>
    </div>
  );
}