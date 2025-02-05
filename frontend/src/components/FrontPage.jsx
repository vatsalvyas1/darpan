import React, { useEffect, useState } from "react";
import HeroCarousel from "./HomePage";
import Card from "./ExploreFundraise";
import DonationCard from "./DonationCard";
import Marquee from "./Marquee";

const FrontPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <HeroCarousel />
      <div className="text-center">
        <h1 className="text-4xl font-bold p-[1.5rem] text-[#222]">Donation Events</h1>
        <p className="font-normal flex justify-self-center max-w-[400px] text-[#666] pb-[1.5rem]">
          Create sustained impact. Support verified projects. Get regular updates. Save tax. Cancel anytime.
        </p>
      </div>

      {/* Show loading indicator */}
      {loading ? (
        <p className="text-center text-lg">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-lg">No donation events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {donations.map((donation) => (
            <DonationCard key={donation._id} {...donation} />
          ))}
        </div>
      )}

      <Marquee />
      <Card />
    </div>
  );
};

export default FrontPage;
