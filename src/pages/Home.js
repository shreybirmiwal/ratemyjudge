import React from "react"

import Navbar from "../Components/Navbar.js";
import Hero from "../Components/Hero.js";
import SearchBar from '../Components/SearchBar';

function Home() {
  return (
    <div className="App">

        <Navbar/>
        <Hero/>

    </div>

  );
}

export default Home;