import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Heart, Users, MapPin, ArrowRight } from "lucide-react";

export default function VolunteerCard({ event }) {
  const navigate = useNavigate();

  if (!event || !event._id) return null;

  return (
    <div className="cursor-pointer group relative flex h-[450px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      {/* Image Section */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <img
          src={event?.images?.[0] || "https://via.placeholder.com/300"}
          alt={event?.title || "Event Image"}
          className="h-full w-full object-cover brightness-[0.95] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90" />
        
        {/* Category Badge */}
        <div className="absolute left-4 top-4 flex gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
            <Users size={14} className="animate-pulse" />
             EVENT
          </span>
          
        </div>
        
        {/* Title Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <MapPin size={16} className="text-rose-400" />
            <span className="text-sm">Local Community</span>
          </div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg transition-transform duration-300 group-hover:translate-x-1">
            {event?.title || "Untitled Event"}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-grow flex-col p-6">
        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600/90">
          {event?.whyJoinUs || "No details available."}
        </p>

        {/* Date Information */}
        <div className="mt-6 space-y-3 border-t-2 border-gray-200 pt-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50/50 px-4 py-2.5 text-sm transition-colors duration-300 group-hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
              <span className="font-medium text-xl text-gray-700">Start Date</span>
            </div>
            <span className="font-medium text-xl text-gray-900">
              {event?.when?.from ? new Date(event.when.from).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50/50 px-4 py-2.5 text-sm transition-colors duration-300 group-hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-green-500" />
              <span className="font-medium text-xl text-gray-700">End Date</span>
            </div>
            <span className="font-medium text-xl text-gray-800">
              {event?.when?.to ? new Date(event.when.to).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Overlay with Button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-black/40 group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/event/${event?._id}`);
          }}
          className="cursor-pointer flex items-center gap-2 transform rounded-full bg-white/90 px-8 py-4 text-sm font-bold tracking-wide text-gray-900 shadow-[0_8px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_10px_20px_rgba(0,0,0,0.25)] active:scale-95"
        >
          <span className="text-red-400">VOLUNTEER</span> NOW
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}