import './App.css';
import React from "react"
import SearchBar from './Components/SearchBar';
import Data from './Data.json'

function App() {
  return (
    <div className="App">
      
      <textarea>
        Hello there, this is some text in a text area
      </textarea>

      <SearchBar placeholder={"Search for judges..."}/>
    </div>
  );
}

export default App;
