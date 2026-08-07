import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className='min-h-screen max-w-7xl'>
      </div>
    </>
  )
}

export default App