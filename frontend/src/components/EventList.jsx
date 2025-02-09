import { useState } from "react";
import VolunteerCard from "./VolunteerCard"; 

export default function EventList({ events = [], title = "Upcoming Events" }) {
  const [visibleCount, setVisibleCount] = useState(3);

  // Filter and sort upcoming events
  const upcomingEvents = events
    .filter((event) => new Date(event.when.to) > new Date()) // Only future events
    .sort((a, b) => new Date(a.when.to) - new Date(b.when.to)); // Sort by date

  return (
    <div className="px-4 md:px-0">
      {/* Section Title */}
      <h3 className="text-4xl font-bold text-center p-[1.5rem] text-[#222]">{title}</h3>
      <p className="font-normal text-[#666] pb-[1.5rem] px-4 md:px-10 text-center">
        Join us in making a difference by enrolling as a volunteer for our upcoming events! 
        Your time and effort can bring positive change to those in need.
      </p>

      {/* Display Events */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.slice(0, visibleCount).map((event) => <VolunteerCard key={event._id} event={event} />)
        ) : (
          <p className="text-center text-gray-500">No upcoming events available.</p>
        )}
      </div>

      {/* View More & View Less Buttons */}
      <div className="text-center mt-6">
        {visibleCount < upcomingEvents.length && (
          <button
            onClick={() => setVisibleCount(visibleCount + 3)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 mx-2"
          >
            View More
          </button>
        )}
        {visibleCount > 3 && (
          <button
            onClick={() => setVisibleCount(3)}
            className="bg-gray-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300 mx-2"
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
}
