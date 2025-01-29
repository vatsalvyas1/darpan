import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [ngos, setNgos] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Mock data for NGOs
    const mockNgos = [
      {
        _id: "1",
        name: "Helping Hands",
        causesSupported: ["Education", "Health", "Environment"],
      },
      {
        _id: "2",
        name: "Green Earth Initiative",
        causesSupported: ["Environment", "Sustainability"],
      },
      {
        _id: "3",
        name: "Bright Futures Foundation",
        causesSupported: ["Child Welfare", "Education"],
      },
    ];

    // Mock data for Events
    const mockEvents = [
      {
        _id: "1",
        title: "Clean the Beach Drive",
        date: "2025-02-15",
      },
      {
        _id: "2",
        title: "Tree Plantation Drive",
        date: "2025-03-01",
      },
      {
        _id: "3",
        title: "Marathon for Education",
        date: "2025-04-10",
      },
    ];

    // Simulate fetching data
    setTimeout(() => {
      setNgos(mockNgos);
      setEvents(mockEvents);
    }, 500); // Mock network delay
  }, []);

  return (
    <div className="p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
        <p className="mt-2 text-gray-600">
          Discover NGOs, join events, and make an impact on society.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Featured NGOs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {ngos.map((ngo) => (
            <div key={ngo._id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{ngo.name}</h3>
              <p className="text-gray-600">
                Causes Supported: {ngo.causesSupported.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {events.map((event) => (
            <div key={event._id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-gray-600">Date: {event.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Donate Now</h2>
        <p className="text-gray-600 mb-4">
          Make a difference by contributing to a cause you care about.
        </p>
        <Link
          to="/donate"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Make a Donation
        </Link>
      </section>
    </div>
  );
};

export default Homepage;
