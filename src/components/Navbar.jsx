import React from 'react'

const Navbar = () => {

    const nav_links = [
        { name: "Home", link: '#' },
        { name: 'Menu', link: '#menu'},
        { name: 'Booking', link: '#booking'},
    ]

  return (
    <div className='bg-(--bg-color) flex items-center max-w-7xl mx-auto py-5 px-5 justify-between'>
        <div className='font-bold'>Tasty Bites</div>
        <div className='text-black'>
            {nav_links.map((link) => {
            <div key={link.name}>
                <a href={link.link}>{link.name}</a>
            </div>
        })}
        </div>
    </div>
  )
}

export default Navbar