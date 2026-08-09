import { ShoppingBagIcon } from 'lucide-react';
import React from 'react'
import ThemeToggle from './ThemeToggle';

const Navbar = () => {

    const navLinks = [
        {name: 'Home', link: '#hero'},
        {name: 'Menu', link: '#menu'},
        {name: 'Contact', link: '#contact'},
        {name: 'Booking', link: '#booking'}
    ]

  return (
    <nav className='flex justify-between items-center bg-app-bg-subtle px-6 py-4 text-app-text border-b border-app-border shadow-xs'>

        <a href="#hero" className='font-kavoon text-2xl'>
            Tasty Bites
        </a>

        <div className='hidden md:flex gap-6 font-medium'>
            {
                navLinks.map((links) => (
                    <a key={links.name} href={links.link} className='hover:text-app-primary transition'>{links.name}</a>
                ))
            }
        </div>

        <div className='flex items-center gap-6'>
            <ShoppingBagIcon size={20} />

            <ThemeToggle />

            <button className='bg-app-primary text-white px-4 py-2 rounded-full font-semibold shadow hover:opacity-90 transition cursor-pointer'>
                Order Now
            </button>
        </div>
    </nav>
  )
}

export default Navbar