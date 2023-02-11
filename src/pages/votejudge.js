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
    setLay(Number(event.target.value))
  }
  const updateTruthSlider = (event) => {
    setTruth(Number(event.target.value))
  }
  const updateSlowSlider = (event) => {
    setSlow(Number(event.target.value))
  }
  const updateTradSlider = (event) => {
    setTrad(Number(event.target.value))
  }

  const updateName = (event) =>{
     setUser(event.target.value)
  }

  const updateStats = () => {
    //console.log(lay)
    //console.log(truth)
    //console.log(slow)
   // console.log(trad)
   // console.log(user)

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
    //console.log(user)

    const snap =  doc(db, "votes", (firstName+" "+lastName))

    updateDoc(snap, {
      [user] : {lay: lay, truth: truth, slow: slow, trad: trad}
    })

    const avgStats = data["AverageStats"]
    var votesTemp = avgStats["votes"]
    //console.log(avgStats)

    if(votesTemp === 0){
      updateDoc(snap, {
        AverageStats : {lay: lay, truth: truth, slow: slow, trad: trad, votes:1}
      })


      const tempName = "/judges/" + firstName+"/" +lastName
      navigate(tempName, { replace: true });

    }
    else{
      //if its not the first vote, we want to reaverage and update avg stats
      //data includes all data except new data and we also dont want to read avg data

      var tLay = 0
      var tTrad = 0
      var tSlow = 0
      var tTruth = 0
      console.log("user " + user)

      for (let key in data) {
        console.log(key)
        if(key !== "AverageStats" && key!==user){
          tLay += data[key].lay
          tTrad += data[key].trad
          tSlow += data[key].slow
          tTruth += data[key].truth
          console.log(key, data[key]);
        }
        if(key == user) votesTemp--;
      }

      tLay = (tLay+lay)
      tTrad = (tTrad+lay)
      tSlow = (tSlow+lay)
      tTruth = (tTruth+lay)
      

      updateDoc(snap, {
        AverageStats : {lay: tLay, truth: tTruth, slow: tSlow, trad: tTrad, votes:(votesTemp+1)}
      })

      const tempName = "/judges/" + firstName+"/" +lastName
      navigate(tempName, { replace: true });

    }

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