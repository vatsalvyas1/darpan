import React from "react";
import HeroCarousel from "./HomePage";
import Card from "./ExploreFundraise";
import DonationCard from "./DonationCard";
import Marquee from "./Marquee";
function FrontPage() {
  return (
    <div>
      <HeroCarousel />
      <div className="text-center">
        <h1 className=" text-4xl font-bold p-[1.5rem] text-[#222]">Donation Events</h1>
        <p className="font-normal flex justify-self-center max-w-[400px] text-[#666] pb-[1.5rem] "> Create sustained impact. Support verified projects. Get regular updates. Save tax. Cancel anytime.</p>
      </div>
      <DonationCard />
      <Marquee />
      <Card />
    </div>
  );
}

export default FrontPage;