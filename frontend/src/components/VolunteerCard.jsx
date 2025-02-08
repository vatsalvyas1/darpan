import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VolunteerCard() {
    const [events, setEvents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); // Initial state: 3 events visible
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events");
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                let data = await response.json();

                const currentDate = new Date();

                // Filter out past events and sort by 'from' date
                data = data
                    .filter(event => new Date(event.when.to) >= currentDate) // Keep only future & ongoing events
                    .sort((a, b) => new Date(a.when.from) - new Date(b.when.from)); // Sort by 'from' date

                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="px-4 md:px-0"> {/* Added padding for mobile */}
            <h3 className="text-4xl font-bold text-center p-[1.5rem] text-[#222]">Events</h3>
            <p className="font-normal text-[#666] pb-[1.5rem] px-4 md:px-10 text-center">
                Join us in making a difference by enrolling as a volunteer for our upcoming events! Your time and effort can bring positive change to those in need. Whether it’s distributing food, organizing donations, or assisting in community outreach programs, every contribution matters. Be a part of a compassionate team dedicated to creating a better world. Sign up today and help us turn kindness into action!
            </p>

            {/* Grid Layout for Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                    events.slice(0, visibleCount).map((event) => (
                        <div
                            key={event._id}
                            className="group bg-white shadow-lg rounded-3xl overflow-hidden transition-transform hover:scale-105 flex flex-col h-[400px] relative"
                        >
                            {/* Image Section */}
                            <div className="relative h-[250px] w-full">
                                <img
                                    src={event.images?.[0] || "https://via.placeholder.com/300"}
                                    alt={event.title}
                                    className="w-full h-full object-contain"
                                />

                                {/* Gradient Overlay & Title */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                    <p className="text-white/90 italic mb-1">Mission</p>
                                    <h2 className="text-white text-xl font-bold">{event.title}</h2>
                                </div>
                            </div>

                            {/* Hover Effect for Button */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/event/${event._id}`);
                                    }}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform cursor-pointer"
                                >
                                    Volunteer Now
                                </button>
                            </div>

                            {/* Event Description */}
                            <div className="p-4 flex flex-col flex-grow">
                                <p className="text-gray-800 text-sm flex-grow line-clamp-3">{event.whyJoinUs}</p>
                                <p className="text-gray-600 mt-2">
                                    <strong>From:</strong> {new Date(event.when.from).toLocaleDateString()} <br />
                                    <strong>To:</strong> {new Date(event.when.to).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No upcoming events available.</p>
                )}
            </div>

            {/* View More & View Less Buttons */}
            <div className="text-center mt-6">
                {visibleCount < events.length && (
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
