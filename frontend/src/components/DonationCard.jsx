import React from 'react'
import { Link } from 'react-router-dom'

const DonationCard = () => {
    return (
        <Link to="/donationform">
        <div className="max-w-md mx-auto p-4 cursor-pointer">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative">
                    <div className="relative h-[300px]">
                        <img
                            src="https://cdn.pixabay.com/photo/2017/09/16/01/03/girl-2754233_1280.jpg"
                            alt="Silhouette in a corridor"
                            className="w-full h-full object-cover transition-all duration-300 hover:brightness-110"
                        />
                    </div>

                    <div className="absolute top-4 left-4">
                        <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium">
                            Tax Benefits Available
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-white">
                            <p className="text-sm font-medium italic mb-2">Mission</p>
                            <h2 className="text-2xl font-bold">No Child Orphaned</h2>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative h-16 w-16">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="#eee" strokeWidth="8" fill="none" />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#FF6B6B"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray="175.9"
                                    strokeDashoffset="86.19"
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">51%</span>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-rose-500">₹25,40,757</span>
                                <span className="text-gray-600">raised,</span>
                                <span className="text-gray-900 font-medium">₹24L left</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <span>1866 Donations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )
}

export default DonationCard
