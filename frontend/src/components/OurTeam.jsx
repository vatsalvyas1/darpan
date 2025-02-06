import React from 'react';
import TiltedCard from './TiltedCard';
import archit from '../../src/assets/archit.jpg';
import vatsal from '../../src/assets/vatsal.jpg';

const OurTeam = () => {
    return (
        <div className='bg-gray-100'>
            <div>
                <h3 className='text-4xl flex justify-center font-bold gap-3 mt-2.5'>
                    <span className='text-purple-500'>Meet</span>
                    <span className='text-gray-700'>Our</span>
                    Team
                </h3>
                {/* Responsive Paragraph */}
                <p className='text-xl mx-6 my-4 text-center md:max-w-2xl lg:max-w-4xl xl:max-w-6xl '>
                    Our team consists of driven professionals with a shared commitment to fostering positive change in our communities. Each member brings a wealth of experience and a deep understanding of the nonprofit sector, ensuring that we facilitate impactful and lasting partnerships. Together, we strive to empower volunteers and support organizations in making a difference.
                </p>
                <div className='flex justify-center gap-4 flex-wrap mb-10'>
                    <TiltedCard
                        imageSrc={vatsal}
                        altText="Vatsal Vyas - Developer"
                        captionText="Vatsal Vyas- Full Stack Developer"
                        containerHeight="300px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text capitalize text-white tracking-tight bg-black/40 rounded-[15px] m-[30px] mt-[1rem] px-4 py-2 font-dmSans font-black shadow-[0_5px_30px_#06060659] border-0 box-border break-words block ">
                                Vatsal - Project Lead
                            </p>
                        }
                        mobileStyles="md:scale-100 md:rotate-0" // Disable animations on mobile
                    />
                    <TiltedCard
                        imageSrc={archit}
                        altText="Archit Choudhary - Developer"
                        captionText="Archit Choudhary - Developer"
                        containerHeight="300px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text capitalize text-white tracking-tight bg-black/40 rounded-[15px] m-[30px] mt-[1rem] px-4 py-2 font-dmSans font-black shadow-[0_5px_30px_#06060659] border-0 box-border break-words block ">
                                Archit - Developer
                            </p>
                        }
                        mobileStyles="md:scale-100 md:rotate-0" // Disable animations on mobile
                    />
                    <TiltedCard
                        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                        altText="Itish Sharma - Developer"
                        captionText="Itish Sharma - Developer"
                        containerHeight="300px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text capitalize text-white tracking-tight bg-black/40 rounded-[15px] m-[30px] mt-[1rem] px-4 py-2 font-dmSans font-black shadow-[0_5px_30px_#06060659] border-0 box-border break-words block ">
                                Itish - Developer
                            </p>
                        }
                        mobileStyles="md:scale-100 md:rotate-0" // Disable animations on mobile
                    />
                    <TiltedCard
                        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                        altText="Lakshya Singh - Developer"
                        captionText="Lakshay Singh - Developer"
                        containerHeight="300px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text capitalize text-white tracking-tight bg-black/40 rounded-[15px] m-[30px] mt-[1rem] px-4 py-2 font-dmSans font-black shadow-[0_5px_30px_#06060659] border-0 box-border break-words block ">
                                Lakshya - Developer
                            </p>
                        }
                        mobileStyles="md:scale-100 md:rotate-0" // Disable animations on mobile
                    />
                </div>
            </div>
        </div>
    );
};

export default OurTeam;