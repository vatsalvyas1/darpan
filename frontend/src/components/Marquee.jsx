import { useEffect, useState } from "react";
import FastMarquee from "react-fast-marquee";

const Marquee = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/donation-form") 
            .then(response => response.json())
            .then(data => setDonations(data))
            .catch(error => console.error("Error fetching donation forms:", error));
    }, []);

    return (
        <div className="bg-red-50 py-2">
            <FastMarquee
                speed={50}
                gradient={false}
            >
                {donations.map((donation, index) => (
                    <span key={index} className="flex items-center text-lg font-medium text-gray-900 mx-3">
                        {donation.donorName} just donated 
                        <span className="text-red-500 font-bold ml-1">₹{donation.donationAmount}</span>
                    </span>
                ))}
            </FastMarquee>
        </div>
    );
};

export default Marquee;