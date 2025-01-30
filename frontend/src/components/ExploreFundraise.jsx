import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const causes = [
  {
    name: "Elderly",
    image:
      "https://www.griswoldcare.com/wp-content/uploads/2024/04/bigstock-elderly-and-nurse-or-carer-25600913.jpg",
  },
  {
    name: "Animal",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Health",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Poverty",
    image:
      "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Differently Abled",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Disaster Relief",
    image:
      "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  },
];

export default function ExploreFundraisers() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Explore fundraisers for other causes</h2>
        <div className="relative">
          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1} // Default for mobile
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              480: { slidesPerView: 2 }, // Show 2 slides on slightly larger mobile screens
              640: { slidesPerView: 2 }, // 2 slides for small screens
              768: { slidesPerView: 3 }, // 3 slides on tablets
              1024: { slidesPerView: 4 }, // 4 slides on desktops
              1280: { slidesPerView: 5 }, // 5 slides on large desktops
            }}
            className="overflow-hidden"
          >
            {causes.map((cause, index) => (
              <SwiperSlide key={index} className="px-2">
                <div className="relative group cursor-pointer">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={cause.image}
                      alt={cause.name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        console.error(`Error loading image: ${cause.image}`);
                        e.target.style.display = "none"; // Hide the image if it fails to load
                      }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white [text-shadow:_0_2px_0_rgb(0_0_0_/_50%)] font-bold text-lg">
                        {cause.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg  rounded-full">
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-lg rounded-full">
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
}