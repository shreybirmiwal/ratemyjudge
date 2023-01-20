import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import React from "react"
import Home from './pages/Home';
import AddJudge from './pages/AddJudge';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/AddJudge" element={<AddJudge/>}/>

      </Routes>
    </Router>

  );
}

export default App;
