import React from 'react'
import { useParams } from "react-router-dom";
import './ViewJudge.css'
import { db } from '../firebase';
import { collection, getDocs, doc,getDoc,updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewJudge() {

    const [data, setData] = useState({})
    const [commentText, setcommentText] = useState("");

    const routeParams = useParams();


    const getData = async () =>{
      var nameVar = routeParams.first + " " + routeParams.last;
      const snap = await getDoc(doc(db, "votes", nameVar));

      setData(snap.data()["AverageStats"])
    }
    

    const updateCommentText = (event) =>{
      setcommentText(event.target.value)
    }

    const submitComment = () => {

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
        const docRef = doc(db, "judge", nameVar);

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
        window.location.reload();

      }


    }

    useEffect(() => {
      getData()
        
    }, [])

    const tempNameVar = "/Vote/"+routeParams.first+"/"+routeParams.last;

  return (
    <div className="App">
      <div className='headerText'>
        <p> Judging information about {routeParams.first} {routeParams.last}</p>
      </div>

      <a href='/'> back to home </a>
      <a href={tempNameVar}> Vote on this Judge! </a>

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


      {data["comments"] &&  data["comments"].map((value, key) => {

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

