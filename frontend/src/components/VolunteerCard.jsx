export default function VolunteerCard() {


    return (
        <>
        <h3 className="text-4xl font-bold text-center p-[1.5rem] text-[#222]">Events</h3>
        <p className="font-normal flex justify-self-center text-[#666] pb-[1.5rem] px-10 text-center">Join us in making a difference by enrolling as a volunteer for our upcoming events! Your time and effort can bring positive change to those in need. Whether it’s distributing food, organizing donations, or assisting in community outreach programs, every contribution matters. Be a part of a compassionate team dedicated to creating a better world. Sign up today and help us turn kindness into action!</p>
        
            <div className="max-w-md mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg transition-transform hover:scale-105">
                    <div className="relative h-72">
                        <img
                            src="https://vakilsearch.com/blog/wp-content/uploads/2021/09/How-To-Start-An-NGO-In-India.jpg"
                            alt="People lined up for food distribution"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute top-4 left-4">
                            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                                Tax Benefits Available
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                            <p className="text-white/90 italic mb-2">Mission</p>
                            <h2 className="text-white text-3xl font-bold mb-2">Feed the Hungry</h2>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30">
                            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-transform cursor-pointer">
                                Volunteer Now
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-800 text-lg">
                            Help feed those in need – <span className="text-red-500 font-medium">donate a meal</span> today!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
