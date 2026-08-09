import React from 'react'

const Hero = () => {
  return (
    <div id='#hero' className='flex flex-col justify-between items-center px-6 py-16 max-w-6xl mx-auto gap-10'>
        <div className='flex-1 text-center md:text-left'>
            <h1 className='text-4xl md:text-5xl font-extrabold text-app-text'>
                Continental Premium <span className='text-app-primary'>Flavoured Dishes</span>
            </h1>

            <p className='mt-4 text-app-muted text-lg'>
                Freshly made gourmet dishes delivered straight to your doorstep.
            </p>

            <div className='mt-6 flex justify-center md:justify-start space-x-4'>
                <a href="#menu" className='bg-app-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition'>
                    View Menu
                </a>
            </div>
        </div>

        <div className='flex-1 flex justify-center w-full'>
            <div className='w-full max-w-md h-64 bg-app-bg-subtle border border-app-border rounded-2xl flex items-center justify-center text-app-primary font-bold shadow-md'>
                [Tasty Food Banner]
            </div>
        </div>
    </div>
  )
}

export default Hero