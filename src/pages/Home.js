import './Home.css';
import React from "react"
import SearchBar from '../Components/SearchBar';

function Home() {
  return (
    <div className="App">
      
      <p className='headerText'>
        RateMyJudge.com
      </p>

      <SearchBar placeholder={"Search for judges..."}/>
    </div>
  );
}

export default Home;
