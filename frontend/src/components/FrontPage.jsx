import React, { useEffect, useState } from "react";
import HeroCarousel from "./HomePage";
import Card from "./ExploreFundraise";
import DonationList from "./DonationList"; 
import Marquee from "./Marquee";
import VolunteerCard from "./VolunteerCard";

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
      {loading ? (
        <p className="text-center text-lg">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-lg">No donation events available.</p>
      ) : (
        <DonationList donations={donations} /> 
      )}

      <Marquee />
      <VolunteerCard />
      <Card />
    </div>
  );
};

export default FrontPage;
