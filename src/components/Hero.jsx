import React from 'react'
import hero from '../../src/assets/hero.jpg'

const Hero = () => {
  return (
    <div style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${hero})`
        }} className='min-h-screen w-full bg-cover bg-center bg-no-repeat flex '>
            <div className='px-100 pt-40 text-white'>
                <p className='uppercase font-medium'>authentic african flavors</p>
                <p className='font-bold pt-5 text-7xl w-5/6'>
                    A Taste of <span className='text-(--primary-btn)'>Home</span> Away From Home 
                </p>
                <p className='pt-5 font-medium w-7/12 text-lg'>
                    Whether you are craving a taste of home or planning a special celebration, Tasty Bites brings authentic African flavors to your table through nationwide shipping, catering, private dining, and unforgettable experiences.
                </p>
                <div className='flex gap-4 pt-10'>
                    <button className='rounded-lg px-8 py-2 text-white bg-(--primary-btn) text-center'>
                        Order Now
                    </button>
                    <button className='rounded-lg px-8 py-2 text-white bg-black text-center'>
                        Learn More
                    </button>
                </div>

                <div className='border-b border-(--primary-btn) pt-20' />

                <div className='grid grid-cols-3 gap-7 pt-10'>
                    <div className=''>
                        <p className='font-kavoon font-white text-2xl'>500+</p>
                        <p className='font-medium font-white w-1/3'>Customers across the UK and US </p>
                    </div>
                    <div className=''>
                        <p className='font-kavoon font-white text-2xl'>10+</p>
                        <p className='font-medium font-white w-1/3'>Dishes Available </p>
                    </div>
                    <div className=''>
                        <p className='font-kavoon font-white text-2xl'>4.9</p>
                        <p className='font-medium font-white w-1/3'>Star Rating </p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Hero