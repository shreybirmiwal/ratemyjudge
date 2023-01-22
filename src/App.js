import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import React from "react"
import Home from './pages/Home';
import AddJudge from './pages/AddJudge';
import ViewJudge from './pages/ViewJudge';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/AddJudge" element={<AddJudge/>}/>
        <Route path="/Judges/:first/:last" element={<ViewJudge/>} />

      </Routes>
    </Router>

  );
}

export default App;
