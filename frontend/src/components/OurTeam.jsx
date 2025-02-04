import React from 'react'
import TiltedCard from './TiltedCard'


const OurTeam = () => {
    return (
        <div>
            <h1 className='text-4xl flex justify-center font-bold gap-3 '><span className='text-red-500'>Our</span>Team</h1>
            <TiltedCard
                imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                altText="Kendrick Lamar - GNX Album Cover"
                captionText="Kendrick Lamar - GNX"
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
                        Kendrick Lamar - GNX
                    </p>
                }
            />
        </div>
    )
}

export default OurTeam
