import React from 'react'
import { motion } from 'framer-motion'
const Marquee = () => {
    const marqueeText = [
        { name: 'Archit', amount: '₹2200' },
        { name: 'Itish Sharma', amount: '₹1000' },
        { name: 'Ayush', amount: '₹3000' },
        { name: 'Rajat Mangla', amount: '₹4500' },
        { name: 'Vatsal', amount: '₹1500' },
    ]
    return (
        <div className=' overflow-hidden bg-red-50 py-2'>
            <div className='flex '>
                <motion.div className='flex whitespace-nowrap gap-6'
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", repeat: Infinity, duration: 15 }}>
                    {[...marqueeText, ...marqueeText].map((item, index) => (
                        <span key={index} className='flex items-center text-lg font-medium text-gray-900'>
                            {item.name} just donated <span className='text-red-500 font-bold ml-1'>{item.amount}</span>
                        </span>
                    ))}
                </motion.div>

                <motion.div className='flex whitespace-nowrap gap-6'
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", repeat: Infinity, duration: 15 }}>
                    {[...marqueeText, ...marqueeText].map((item, index) => (
                        <span key={index} className='flex items-center text-lg font-medium text-gray-900'>
                            {item.name} just donated <span className='text-red-500 font-bold ml-1'>{item.amount}</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Marquee
