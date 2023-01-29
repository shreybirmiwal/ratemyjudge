import React from 'react'
import { useParams } from "react-router-dom";
import './ViewJudge.css'
import { db } from '../firebase';
import { collection, getDocs, doc,getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

function ViewJudge() {

    const [lay, setLay] = useState(50);


    const [data, setData] = useState({})
    const routeParams = useParams();
    console.log(routeParams.first)
    console.log(routeParams.last)

    const getData = async () =>{
      var nameVar = routeParams.first + " " + routeParams.last;
      const snap = await getDoc(doc(db, "judge", nameVar));

      setData(snap.data())
  }
  

      useEffect(() => {
        getData()
        
      }, [])


  return (
    <div className="App">
      <div className='headerText'>
        <p> Judging information about {routeParams.first} {routeParams.last}</p>
      </div>

      <a href='/'> back to home </a>

      <div className='stats'>
        <p> Judge Stats from [{data["total_votes"]}] votes</p>
      </div>


      <div className='stats'>
        <p className='labelingLeft'>Lay&nbsp;</p>


        <div
          style={{ width: `${400}px`, height: `${40}px` }}
          className='outside'
        > 
          <div
            style={{ width: `${data["lay_flow_flaw"]*4}px`, height: `${40}px` }}
            className='inside'>
            </div>
        </div>

        <p className='labelingRight'>Flow</p>

      </div>

      <div className='stats'>
        <p className='labelingLeft'>Truth</p>


        <div
          style={{ width: `${400}px`, height: `${40}px` }}
          className='outside'
        > 
          <div
            style={{ width: `${data["tech_truth"]*4}px`, height: `${40}px` }}
            className='inside'>
            </div>
        </div>

        <p className='labelingRight'>Tech&nbsp;&nbsp;&nbsp;</p>

      </div>


      <div className='stats'>
        <p className='labelingLeft'>Slow&nbsp;</p>


        <div
          style={{ width: `${400}px`, height: `${40}px` }}
          className='outside'
        > 
          <div
            style={{ width: `${data["talking_speed"]*4}px`, height: `${40}px` }}
            className='inside'>
            </div>
        </div>

        <p className='labelingRight'>Spread</p>

      </div>


      <div className='stats'>
        <p className='labelingLeft'>Traditional</p>


        <div
          style={{ width: `${400}px`, height: `${40}px` }}
          className='outside'
        > 
          <div
            style={{ width: `${data["traditional_progressive"]*4}px`, height: `${40}px` }}
            className='inside'>
            </div>
        </div>

        <p className='labelingRight'>Progressive</p>

      </div>


      <p> Comments go here </p>


    </div>
  )
}

export default ViewJudge

