import React from 'react'
import { ShoppingBag } from 'lucide-react'

const Navbar = () => {

    const nav_links = [
        { name: "Home", link: '#' },
        { name: 'Menu', link: '#menu'},
        { name: 'Booking', link: '#booking'},
        { name: 'Contacts', link: '#contacts'},
    ]

  return (
    <div className='bg-(--bg-color)'>
        <div className='max-w-7xl mx-auto flex items-center py-5 px-5 justify-between'>
            <div className='font-kavoon text-2xl'>
                Tasty <span className='text-(--primary-btn)'>Bites</span> 
            </div>
            <div className='flex gap-7'>
                {nav_links.map((link) => (
                <div key={link.name}>
                    <a className='hover:text-(--primary-btn) font-medium' href={link.link}>{link.name}</a>
                </div>
            ))}
            </div>
            <div className='flex items-center gap-9 text-center'>
                <ShoppingBag size={20}/>
                <button className="bg-(--primary-btn) px-7 py-2 rounded-lg text-white font-bold">
                    Order Now
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar