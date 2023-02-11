import React from 'react'
import './votejudge.css'
import { useParams } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs, doc,getDoc,updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

function VoteJudge() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [data, setData] = useState({})

    const [lay, setLay] = useState(50);
    const [truth, setTruth] = useState(50);
    const [slow, setSlow] = useState(50);
    const [trad, setTrad] = useState(50);

    const [user, setUser] = useState("")

    const routeParams = useParams();

    const getData = async () => {
        setFirstName(routeParams.first)
        setLastName(routeParams.last)
        var nameVar = routeParams.first +" " + routeParams.last
        const snap = await getDoc(doc(db, "votes", nameVar))
        setData(snap.data())
    }

    useEffect(() => {
        getData()
          
      }, [])

  const tempNameVar = "/Judges/"+firstName+"/"+lastName;

  const updateLaySlider = (event) => {
    setLay(event.target.value)
  }
  const updateTruthSlider = (event) => {
    setTruth(event.target.value)
  }
  const updateSlowSlider = (event) => {
    setSlow(event.target.value)
  }
  const updateTradSlider = (event) => {
    setTrad(event.target.value)
  }

  const updateName = (event) =>{
     setUser(event.target.value)
  }

  const updateStats = () => {
    console.log(lay)
    console.log(truth)
    console.log(slow)
    console.log(trad)
    console.log(user)

    toast.success('Success!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log(user)

    const snap =  doc(db, "votes", (firstName+" "+lastName))

    updateDoc(snap, {
      [user] : {lay: lay, truth: truth, slow: slow, trad: trad}
    })

    console.log(data);

    const tempName = "/judges/" + firstName+"/" +lastName

    //navigate(tempName, { replace: true });
  }

  return (
    <div className="App">
      <div className='headerText'>
        <p> Vote on {firstName} {lastName}</p>
      </div>

      <a href='/'> back to home </a>
      <a href={tempNameVar}> View this Judge </a>

      <p>   </p>
      <input
          type="text"
          placeholder="Enter username voting from"
          value={user}
          onChange={updateName}
      />
      <p>   </p>



      <div className='stats'>
        <p className='labelingLeft'>Lay&nbsp;</p>
          <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateLaySlider}/>
        <p className='labelingRight'>Flow</p>
      </div>


      <div className='stats'>
        <p className='labelingLeft'>Truth</p>
          <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateTruthSlider}/>
        <p className='labelingRight'>Tech&nbsp;&nbsp;&nbsp;</p>
      </div>



      <div className='stats'>
        <p className='labelingLeft'>Slow&nbsp;</p>
          <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateSlowSlider}/>
          <p className='labelingRight'>Spread</p>
      </div>



      <div className='stats'>
        <p className='labelingLeft'>Traditional</p>
          <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateTradSlider}/>
          <p className='labelingRight'>Progressive&nbsp;</p>
      </div>


      <button 
          className='submitButton'
          onClick={updateStats}>
          Submit
      </button>

      <ToastContainer/>

    </div>    
 )
}

export default VoteJudge