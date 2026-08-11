import React from 'react'

const Hero = () => {
  return (
    <div id='hero' className='flex flex-col md:flex-row justify-center items-center px-6 py-16 lg:py-0 max-w-6xl mx-auto gap-10 lg:min-h-screen'>
      <div className='flex-1 text-center md:text-left'>
        <span className='text-app-primary font-bold text-sm tracking-widest uppercase inline-block mb-3'>
          Home-Cooked African Delights
        </span>
        
        <h1 className='text-4xl md:text-5xl font-extrabold text-app-text leading-tight'>
          Authentic African Kitchen, <span className='text-app-primary'>Crafted with Love</span>
        </h1>

        <p className='mt-4 text-app-muted text-base md:text-lg leading-relaxed'>
          Welcome to our small family kitchen! We serve slow-cooked, traditional African dishes made daily from scratch using fresh, locally sourced ingredients and time-honored recipes.
        </p>

        <div className='mt-6 flex flex-wrap justify-center md:justify-start gap-4'>
          <a 
            href="#menu" 
            className='bg-app-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition cursor-pointer shadow-sm active:scale-[0.98]'
          >
            Order Now
          </a>
          <a 
            href="#contact" 
            className='bg-app-bg-subtle text-app-text border border-app-border px-6 py-3 rounded-lg font-medium hover:bg-app-card transition cursor-pointer active:scale-[0.98]'
          >
            Our Story
          </a>
        </div>
      </div>

      <div className='flex-1 flex justify-center w-full'>
        <div className='w-full max-w-md h-72 md:h-96 bg-app-bg-subtle border border-app-border rounded-2xl flex items-center justify-center text-app-primary font-bold shadow-md overflow-hidden relative group'>
          <img 
            src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?q=80&w=1470&auto=format&fit=crop" 
            alt="Authentic African Food Spread" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 flex items-end p-4">
            <span className="text-white text-sm font-semibold bg-black/40 backdrop-blur-xs px-3 py-1 rounded-md">
              Fresh Daily Batches
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero