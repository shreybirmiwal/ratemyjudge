import React from 'react'
import { useParams } from "react-router-dom";
import './ViewJudge.css'
import { db } from '../firebase';
import { collection, getDocs, doc,getDoc,updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from 'react-router-dom';

function ViewJudge() {
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [commentsData, SetcommentsData] = useState({})

    const [commentText, setcommentText] = useState("");

    const routeParams = useParams();
    const [authUser, setAuthUser] = useState(null);

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

    const getData = async () =>{
      var nameVar = routeParams.first + " " + routeParams.last;
      const snap = await getDoc(doc(db, "votes", nameVar));
      SetcommentsData(snap.data())
      setData(snap.data()["AverageStats"])
    }
    

    const updateCommentText = (event) =>{
      setcommentText(event.target.value)
    }

    const submitComment = () => {
      var tempNameVar2 = "/account/judges/"+routeParams.first+"/"+routeParams.last;

      if(!authUser){
        navigate(tempNameVar2,{replace:true});

      } else {

      console.log(commentText)
      
      if(commentText.trim().length === 0){
        toast.error('Not a valid comment', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      } else {
          //succesful comment, post to doc!
        var nameVar = routeParams.first + " " + routeParams.last;
        const docRef = doc(db, "votes", nameVar);

        updateDoc(docRef, {
          comments: arrayUnion(commentText)
        })

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

        setcommentText("")
        
      }
    }
    }

    const tempNameVar = "/Vote/"+routeParams.first+"/"+routeParams.last;
    const tempNameVar2 = "/Account/Vote/"+routeParams.first+"/"+routeParams.last;

  return (
    <div className="App">
      <div className='headerText'>
        <p> Judging information about {routeParams.first} {routeParams.last}</p>
      </div>

      <a href='/'> back to home </a>

      {authUser ?(
        <a href={tempNameVar}> Vote on this Judge! </a>

      ):(
        <a href={tempNameVar2}> Vote on this Judge! </a>
      )}


      <div className='stats'>
        <p> Judge Stats from [{data.votes}] votes</p>
      </div>


      <div className='stats'>
        <p className='labelingLeft'>Lay&nbsp;</p>


        <div
          style={{ width: `${400}px`, height: `${40}px` }}
          className='outside'
        > 
          <div
            style={{ width: `${data.lay*4/data.votes}px`, height: `${40}px` }}
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
            style={{ width: `${data.truth*4/data.votes}px`, height: `${40}px` }}
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
            style={{ width: `${data.slow*4/data.votes}px`, height: `${40}px` }}
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
            style={{ width: `${data.trad*4/data.votes}px`, height: `${40}px` }}
            className='inside'>
            </div>
        </div>

        <p className='labelingRight'>Progressive</p>

      </div>

      <div className='padding15'></div>

      <div className='addComment'>

        <p className='commentText'> Add a comment: </p>

        <input
          className='commentInput'
          type="text"
          placeholder="Comment Text"
          value={commentText}
          onChange={updateCommentText}
        />

        <button 
          className='submitButton'
          onClick={submitComment}>
          Submit
        </button>


      </div>


      {commentsData["comments"] &&  commentsData["comments"].map((value, key) => {

        return(
          <div className='commentData'>
            <p className='commentText' key={value}>{value}</p>
          </div>
        )

      })}

      <ToastContainer/>

    </div>
  )
}

export default ViewJudge

