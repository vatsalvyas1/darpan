import { useNavigate } from "react-router-dom";
import { Calendar, Heart, Users, MapPin, ArrowRight, Share2, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function VolunteerCard({ event }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!event || !event._id) return null;

  return (
    <div 
      className="cursor-pointer group relative flex h-[450px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section with Parallax Effect */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <img
          src={event?.images?.[0] || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"}
          alt={event?.title || "Event Image"}
          className={`h-full w-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-95'
          }`}
          style={{ transform: isHovered ? 'scale(1.1) translateY(-2%)' : 'scale(1) translateY(0)' }}
        />
        {/* Dynamic Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : 'opacity-90'
        }`} />

        {/* Dynamic Category Badge */}
        <div className="absolute left-4 top-4 flex gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30">
            <Users size={14} className="animate-pulse" />
            <span className="relative">
              VOLUNTEER EVENT
            </span>
          </span>
        </div>
        
        {/* Animated Title Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300">
          <h2 className={`text-3xl font-bold text-white drop-shadow-lg transition-all duration-300 ${
            isHovered ? 'translate-x-2' : 'translate-x-0'
          }`}>
            {event?.title || "Untitled Event"}
          </h2>
        </div>
      </div>

      {/* Content Section with Dynamic Elements */}
      <div className="flex flex-grow flex-col p-6">
        <p className="line-clamp-3 text-base leading-relaxed text-gray-600/90 transition-all duration-300 group-hover:text-gray-800">
          {event?.whyJoinUs || "No details available."}
        </p>

        {/* Interactive Date Information */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 p-4 transition-all duration-300 group-hover:from-blue-50/50 group-hover:to-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative flex items-center gap-3 pr-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100/80 transition-colors duration-300 group-hover:bg-blue-100">
                    <Calendar size={18} className="text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500">From</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(event?.when?.from)}
                    </span>
                  </div>
                  <div className="absolute -right-1 h-8 w-[1.5px] rotate-12 bg-gray-200"></div>
                </div>
                
                <div className="relative flex items-center gap-3 pl-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100/80 transition-colors duration-300 group-hover:bg-rose-100">
                    <Calendar size={18} className="text-rose-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500">To</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(event?.when?.to)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-blue-500 to-rose-500 transition-transform duration-700"
                style={{ 
                  transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Overlay with Dynamic Button */}
      <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-[2px] transition-all duration-500 ${
        isHovered ? 'bg-black/40 opacity-100' : 'bg-black/0 opacity-0'
      }`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/event/${event?._id}`);
          }}
          className="group/btn flex items-center gap-2 transform rounded-full bg-white/95 px-8 py-4 text-sm font-bold tracking-wide text-gray-900 shadow-[0_8px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_10px_20px_rgba(0,0,0,0.25)] active:scale-95"
        >
          <span className="text-rose-500 transition-colors duration-300 group-hover/btn:text-rose-600">JOIN</span> EVENT
          <ArrowRight 
            size={16} 
            className="transition-all duration-300 group-hover/btn:translate-x-1" 
          />
        </button>
      </div>
    </div>
  );
}