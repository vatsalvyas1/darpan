import TestimonialCard from "./TestimonialCard";

const testimonials = [
    {
        quote: "People often wonder where the money would go. I can tell you, I started working with Darpan when the pandemic first broke a year ago. We validate them, it's a very good, reliable organization. People should have confidence in giving to Darpan and know that the money will be used immediately to help somebody.",
        author: "Ratan Tata",
        role: "Founder & CEO",
        company: "Tata Group",
        imageUrl: "/placeholder.svg"
      },
      {
        quote: "There is a healthcare crisis looming and we must act fast to protect our frontline workers. Their safety is crucial to providing healthcare to patients and we are prioritizing that through the Response fund.",
        author: "Dr. Sarah Chen",
        role: "Medical Director",
        company: "Healthcare Alliance",
        imageUrl: "/placeholder.svg"
      },
      {
        quote: "The innovative approach to problem-solving and the dedication to delivering high-quality solutions has transformed our business operations completely. Their commitment to excellence is truly remarkable.",
        author: "Michael Torres",
        role: "Operations Director",
        company: "Global Solutions Inc",
        imageUrl: "/placeholder.svg"
      },
      {
        quote: "Working with this team has been an absolute pleasure. Their attention to detail and innovative solutions have helped us achieve our goals faster than we anticipated. Highly recommended for any technology needs.",
        author: "Emily Watson",
        role: "Product Manager",
        company: "InnovateX",
        imageUrl: "/placeholder.svg"
      },
      {
        quote: "The level of expertise and professionalism shown by the team is outstanding. They not only met our expectations but consistently exceeded them throughout the project lifecycle.",
        author: "James Chen",
        role: "CTO",
        company: "TechForward",
        imageUrl: "/placeholder.svg"
      },
      {
        quote: "What impressed me most was their ability to understand our unique challenges and create tailored solutions that perfectly addressed our needs. Their support has been invaluable to our success.",
        author: "Lisa Rodriguez",
        role: "VP of Engineering",
        company: "FutureTech Labs",
        imageUrl: "/placeholder.svg"
      }
];

const TestimonialSection = () => {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <TestimonialCard {...testimonials[0]} />
              <TestimonialCard {...testimonials[1]} />
            </div>
            
            {/* Middle Column - With heading and centered card */}
            <div className="flex flex-col">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-10 text-gray-900 mb-4">
                  Here's what people say about <span className="text-red-500">Darpan</span>
                </h2>
                <div className="h-1 w-20 bg-gray-900/10 mx-auto rounded-full" />
              </div>
              <div className="flex-1 flex mb-20 items-center">
                <TestimonialCard {...testimonials[2]} />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              <TestimonialCard {...testimonials[3]} />
              <TestimonialCard {...testimonials[4]} />
            </div>
          </div>
        </div>
      </section>
    );
  };
  

export default TestimonialSection;
