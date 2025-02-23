import { useRef, useState, useEffect } from "react";

export default function TiltedCard({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "300px",
    imageWidth = "300px",
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false,
}) {
    const ref = useRef(null);
    const figureRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!isHovered) {
            if (figureRef.current) {
                figureRef.current.style.setProperty("--rotate-x", "0deg");
                figureRef.current.style.setProperty("--rotate-y", "0deg");
                figureRef.current.style.setProperty("--scale", "1");
            }
        }
    }, [isHovered]);

    function handleMouse(e) {
        if (!ref.current || !figureRef.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        figureRef.current.style.setProperty("--rotate-x", `${rotationX}deg`);
        figureRef.current.style.setProperty("--rotate-y", `${rotationY}deg`);
        figureRef.current.style.setProperty("--scale", `${scaleOnHover}`);

        setTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <div
                ref={figureRef}
                className="relative [transform-style:preserve-3d] transition-transform duration-100 ease-out"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    transform: `
                        rotateX(var(--rotate-x, 0deg))
                        rotateY(var(--rotate-y, 0deg))
                        scale(var(--scale, 1))
                    `,
                }}
            >
                <img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />

                {displayOverlayContent && overlayContent && (
                    <div className="absolute top-4 left-0 w-full text-center text-xl font-bold text-white z-[2] will-change-transform [transform:translateZ(30px)]">
                        {overlayContent}
                    </div>
                )}
            </div>

            {showTooltip && isHovered && (
                <div
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] z-[3] hidden sm:block transition-opacity duration-200"
                    style={{
                        transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                >
                    {captionText}
                </div>
            )}
        </figure>
    );
}