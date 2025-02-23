import React, { useEffect, useState } from "react";
import HeroCarousel from "./HomePage";
import Card from "./ExploreFundraise";
import DonationList from "./DonationList";
import Marquee from "./Marquee";
import EventList from "./EventList";  
import TestimonialSection from "./TestimonialSection";


const FrontPage = () => {
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    // Fetch Donations
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch donations");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoadingDonations(false);
      }
    };

    // Fetch Events
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchDonations();
    fetchEvents();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Donations Section */}
      <section className="my-8">
        {loadingDonations ? (
          <p className="text-center text-lg">Loading donations...</p>
        ) : donations.length === 0 ? (
          <p className="text-center text-lg">No donation events available.</p>
        ) : (
          <DonationList donations={donations} />
        )}
      </section>

      {/* Marquee Section */}
      <Marquee />

      {/* Volunteer Events Section */}
<section className="my-8">
  {loadingEvents ? (
    <p className="text-center text-lg">Loading volunteer opportunities...</p>
  ) : events.length === 0 ? (
    <p className="text-center text-lg">No events available for volunteering.</p>
  ) : (
    <EventList events={events} /> // Pass events to EventList instead
  )}
</section>

      {/* Explore Fundraise Section */}
      <section className="my-8">
        <Card />
      </section>
      {/* testimonial section */}
      <div className="min-h-screen"> <TestimonialSection/> </div>
    </div>
  );
};

export default FrontPage;
