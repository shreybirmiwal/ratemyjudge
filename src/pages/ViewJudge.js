import React from 'react'
import { useParams } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs, doc,getDoc,updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';

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
    <div>
      <Navbar/>
      <div className='w-full h-screen relative'>
        <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
          <h1 className='mb-5'> Judging information about {routeParams.first} {routeParams.last}</h1>
          
          <div className="flex flex-row justify-center">

            <h3 className='mb-5'> Data from [{data.votes}] votes,&nbsp;</h3>
            {authUser ?(
            <a className='text-blue-500 hover:text-white' href={tempNameVar}> <h3> vote on this judge here </h3></a>

            ):(
                <a className='text-blue-500 hover:text-white' href={tempNameVar2}> <h3> vote on this judge here </h3></a>
            )}

          </div>

        <div className='flex flex-row justify-center mt-10'>
          <h3 className='mr-5 mt-1.5'>Lay&nbsp;</h3>
          <div style={{ width: `${400}px`, height: `${40}px` }} className='bg-white'> 
            <div style={{ width: `${data.lay*4/data.votes}px`, height: `${40}px` }}className='bg-blue-300'/>
          </div>
          <h3 className='ml-5 mt-1.5'>Flow</h3>  
        </div>

        <div className='flex flex-row justify-center mt-10'>
          <h3 className='mr-5 mt-1.5'>Truth</h3>
          <div style={{ width: `${400}px`, height: `${40}px` }} className='bg-white'> 
            <div style={{ width: `${data.truth*4/data.votes}px`, height: `${40}px` }}className='bg-blue-300'/>
          </div>
          <h3 className='ml-5 mt-1.5'>Tech</h3>  
        </div>


        <div className='flex flex-row justify-center mt-10'>
          <h3 className='mr-5 mt-1.5'>Slow</h3>
          <div style={{ width: `${400}px`, height: `${40}px` }} className='bg-white'> 
            <div style={{ width: `${data.slow*4/data.votes}px`, height: `${40}px` }}className='bg-blue-300'/>
          </div>
          <h3 className='ml-5 mt-1.5'>Spread</h3>  
        </div>  


        <div className='flex flex-row justify-center mt-10'>
          <h3 className='mr-5 mt-1.5'>Traditional</h3>
          <div style={{ width: `${400}px`, height: `${40}px` }} className='bg-white'> 
            <div style={{ width: `${data.trad*4/data.votes}px`, height: `${40}px` }}className='bg-blue-300'/>
          </div>
          <h3 className='ml-5 mt-1.5'>Progressive</h3>  
        </div>  

        
       </div>
       
      </div>


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

