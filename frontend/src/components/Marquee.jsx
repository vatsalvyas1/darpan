import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Marquee = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/donation-form") 
            .then(response => response.json())
            .then(data => setDonations(data))
            .catch(error => console.error("Error fetching donation forms:", error));
    }, []);

    return (
        <div className="overflow-hidden bg-red-50 py-2">
            <div className="flex">
                <motion.div
                    className="flex whitespace-nowrap gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", repeat: Infinity, duration: 15 }}
                >
                    {[...donations, ...donations].map((donation, index) => (
                        <span key={index} className="flex items-center text-lg font-medium text-gray-900">
                            {donation.donorName} just donated 
                            <span className="text-red-500 font-bold ml-1">₹{donation.donationAmount}</span>
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    className="flex whitespace-nowrap gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", repeat: Infinity, duration: 15 }}
                >
                    {[...donations, ...donations].map((donation, index) => (
                        <span key={index} className="flex items-center text-lg font-medium text-gray-900">
                            {donation.donorName} just donated 
                            <span className="text-red-500 font-bold ml-1">₹{donation.donationAmount}</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;
