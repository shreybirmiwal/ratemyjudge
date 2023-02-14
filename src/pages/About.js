import React from 'react'
import Navbar from '../components/Navbar.js'

function About() {

    return (
    <div className='w-full h-screen relative'>
        <Navbar/>

        <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
          
          <h1>About</h1>
          <h2 className='py-4'></h2>
          <p>This website was created by Shrey Birmiwal in an effort to make debate a more fair....... To be finished </p>
  
        </div>
      </div>
  )


}

export default About