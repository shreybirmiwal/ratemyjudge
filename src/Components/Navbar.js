import React, { useState } from 'react';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false)
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo)
  };

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-black'>
      
      <div className='flex flex-row'>
        <svg viewBox="0 0 100 80" width="40" height="40" onClick={handleNav}>
          <rect y ="5" width="80" height="12"></rect>
          <rect y="27.5" width="80" height="12"></rect>
          <rect y="50" width="80" height="12"></rect>
        </svg>

        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>RATEMYJUDGE.XYZ</h1>
      </div>

      <ul className='hidden md:flex'>
        <li className='hover:text-blue-700'> <a href='/'> Home</a> </li>
        <li className='hover:text-blue-700'> <a href='/AddJudge'>Add a Judge</a></li>
        <li className='hover:text-blue-700'> <a href='/About'>About</a></li>
        <li className='hover:text-blue-700'> <a href="/Account/x/x/x">Account</a></li>
      
      </ul>

      {/* Mobile menu dropdown */}
      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>

        <div className='flex flex-row'>
        <svg viewBox="0 0 100 80" width="40" height="40" onClick={handleNav}>
          <rect y ="5" width="80" height="12"></rect>
          <rect y="27.5" width="80" height="12"></rect>
          <rect y="50" width="80" height="12"></rect>
        </svg>

        <h1>RATEMYJUDGE.XYZ</h1>
        </div>

          <li className='border-b'><a href='/'> Home</a></li>
          <li className='border-b'><a href='/AddJudge'>Add a Judge</a></li>
          <li className='border-b'><a href='/About'>About</a></li>
          <li className='border-b'><a href='/Account/x/x/x'>Account</a></li>

        </ul>
      </div>
    </div>
  );
};

export default Navbar;

