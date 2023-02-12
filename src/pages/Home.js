import React from "react"
import SearchBar from '../Components/SearchBar';
import './Home.css'

function Home() {
  return (
    <div className="App">

        <a href="/Account/Home/x/x" className="text-3xl font-bold underline"> Log in or Sign up </a>
        <SearchBar placeholder={"Search for judges..."}/>

    </div>

  );
}

export default Home;
