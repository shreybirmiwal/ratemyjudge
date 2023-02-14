import React from 'react'
import { useParams } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs, doc,getDoc,updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Navbar from '../components/Navbar.js';

function VoteJudge() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [data, setData] = useState({})

    const [lay, setLay] = useState(50);
    const [truth, setTruth] = useState(50);
    const [slow, setSlow] = useState(50);
    const [trad, setTrad] = useState(50);

    const [authUser, setAuthUser] = useState(null);

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
      const listen = onAuthStateChanged(auth, (user) => {
          console.log(user)
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
  
      return () => {
        listen();
      };
      
    }, []);

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


  const updateStats = () => {
    var tempNameVar2 = "/Account/Vote/"+routeParams.first+"/"+routeParams.last;

    if(!authUser){
      navigate(tempNameVar2,{replace:true});
    } else {

    var user = authUser.uid

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

      for (let key in data) {
        //console.log(key)
        console.log(data[key].lay)

        if(key !== "AverageStats" && key!==user &&key!=="comments"){
          tLay += data[key].lay
          tTrad += data[key].trad
          tSlow += data[key].slow
          tTruth += data[key].truth
          console.log(key, data[key]);
        }
        if(key == user) votesTemp--;
      }


      tLay = (tLay+lay)
      tTrad = (tTrad+trad)
      tSlow = (tSlow+slow)
      tTruth = (tTruth+truth)
      

      updateDoc(snap, {
        AverageStats : {lay: tLay, truth: tTruth, slow: tSlow, trad: tTrad, votes:(votesTemp+1)}
      })

      const tempName = "/judges/" + firstName+"/" +lastName
      navigate(tempName, { replace: true });

    }

  }
  }
  return (
    <div>
      <Navbar/>
      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
          <h1 className='mb-5 hover:text-blue-500'> 
            <a href={tempNameVar}>Vote on {firstName} {lastName}</a>
          </h1>

          <div className='flex flex-row justify-center mt-10'>
            <h3 className='mr-5 mt-1.5'>&nbsp;&nbsp;Lay</h3>
              <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateLaySlider}/>
            <h3 className='ml-5 mt-1.5'>Flow</h3>  
          </div>

          <div className='flex flex-row justify-center mt-10'>
            <h3 className='mr-5 mt-1.5'>Truth</h3>
              <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateTruthSlider}/>
            <h3 className='ml-5 mt-1.5'>Tech&nbsp;&nbsp;</h3>  
          </div>

          <div className='flex flex-row justify-center mt-10'>
            <h3 className='mr-5 mt-1.5'>&nbsp;&nbsp;&nbsp;&nbsp;Slow</h3>
              <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateSlowSlider}/>
            <h3 className='ml-5 mt-1.5'>Spread</h3>  
          </div>  


          <div className='flex flex-row justify-center mt-10'>
            <h3 className='mr-5 mt-1.5'>Traditional</h3>
              <input  className="slida" id="typeinp" type="range" min="0" max="100" defaultValue="50" step="1" onChange={updateTradSlider}/>
            <h3 className='ml-5 mt-1.5'>Progressive</h3>  
          </div>

          <div className='justify-center w-full'>
            <button 
            className='mt-10'
            onClick={updateStats}>
            Submit
            </button>
          </div>

          
      </div>

      <ToastContainer/>

    </div>    
 )
}

export default VoteJudge