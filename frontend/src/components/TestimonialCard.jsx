import { useEffect, useRef } from "react";

const TestimonialCard = ({ 
    quote, 
    author, 
    role, 
    company, 
    imageUrl 
}) => {
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            // Add the class after a small delay to trigger the animation
            requestAnimationFrame(() => {
                cardRef.current?.classList.add("show");
            });
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                hover:shadow-[0_0_30px_rgba(155,135,245,0.5)] 
                dark:hover:shadow-[0_0_30px_rgba(155,135,245,0.3)]
                transition-all duration-300 
                group
                even:hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]
                even:dark:hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]
                opacity-0 translate-y-5
                [&.show]:opacity-100 [&.show]:translate-y-0"
        >
            <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-700 italic group-hover:text-gray-900 transition-colors duration-300">
                    {quote}
                </p>
                
                <div className="flex items-center space-x-4">
                    {imageUrl && (
                        <div className="flex-shrink-0">
                            <img
                                src={imageUrl}
                                alt={author}
                                className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200 
                                    group-hover:ring-[#9b87f5] group-even:group-hover:ring-[#D946EF] 
                                    transition-all duration-300"
                            />
                        </div>
                    )}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">{author}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{role}</span>
                            {company && (
                                <>
                                    <span>•</span>
                                    <span>{company}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;