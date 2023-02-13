import React from "react"

import Navbar from "../components/Navbar.js";
import Hero from "../components/Hero.js";
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="App">

        <Navbar/>
        <Hero/>

    </div>

  );
}

export default Home;