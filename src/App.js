import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import React from "react"
import Home from './pages/Home';
import AddJudge from './pages/AddJudge';
import ViewJudge from './pages/ViewJudge';
import VoteJudge from "./pages/votejudge";
import LoginSignUp from "./pages/LoginSignUp";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={<Home/>}/>
        <Route path="/AddJudge" element={<AddJudge/>}/>
        <Route path="/Judges/:first/:last" element={<ViewJudge/>} />
        <Route path="/Vote/:first/:last" element={<VoteJudge/>} />
        <Route path="/Account/:redirect" element={<LoginSignUp/>}/>

      </Routes>
    </Router>

  );
}

export default App;
