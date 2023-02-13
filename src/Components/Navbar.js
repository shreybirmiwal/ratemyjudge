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
      <div>
        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>RATEMYJUDGE.COM</h1>
      </div>
      <ul className='hidden md:flex'>
        <li className='hover:text-blue-700'> <a href='/'> Home</a> </li>
        <li className='hover:text-blue-700'> <a href='/AddJudge'>Add a Judge</a></li>
        <li className='hover:text-blue-700'> <a>About</a></li>
        <li className='hover:text-blue-700'> <a href='/Account/x/x/x'>Login</a></li>
        <li className='hover:text-blue-700'> <a href="/Account/x/x/x">Signup</a></li>
      </ul>

      {/* Mobile menu dropdown */}
      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <h1>RATEMYJUDGE.COM</h1>
          <li className='border-b'>Home</li>
          <li className='border-b'>Add a Judge</li>
          <li className='border-b'>About</li>
          <li className='border-b'>Login</li>
          <li className='border-b'>Signup</li>

        </ul>
      </div>
    </div>
  );
};

export default Navbar;

