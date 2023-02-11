import React from 'react'
import "./AddJudge.css";
import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc, query } from "firebase/firestore";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'; 
import { Route, Routes, useNavigate } from 'react-router-dom';


function AddJudge() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [judgeTotal, setJudgeTotal] = useState([]);

    useEffect(() => {
        const temp = []

        const q = query(collection(db, "votes"));

        const querySnapshot =  getDocs(q).then(querySnapshot =>{
            querySnapshot.forEach((doc) => {

                //console.log(doc.id, " => ", doc.data());
                temp.push(doc.id)

              })
        }
           
        )
        
        setJudgeTotal(temp)

    }, [])

    const addNewJudge = async () => {
        console.log(firstName);
        console.log(lastName);
        
        var fullName = firstName+" " +lastName;


        if(firstName.trim().length === 0 || lastName.trim().length === 0 ){

            toast.error('Please enter a valid judge name', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            return;
        }

        fullName = fullName.toLowerCase()

        if (judgeTotal.includes(fullName)) {
            console.log("already have this in db")

            toast.warn('Judge already in database', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } 
        
        else {
            setJudgeTotal([...judgeTotal, fullName] )

            setDoc(doc(db, "judge", (firstName+" "+lastName)), {
                tech_truth: 50,
                lay_flow_flaw: 50,
                talking_speed: 50,
                traditional_progressive: 50,
                total_votes: 0,
                comments: [],
            });
            setDoc(doc(db, "votes", (firstName+" "+lastName)), {
                AverageStats: {lay:50, slow:50, trad:50, truth:50, votes: 0 }
            });

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

            const tempName = "/judges/" + firstName+"/" +lastName
            navigate(tempName, { replace: true });

        }
    }
    
    const updateFirst = (event) => {
        setFirstName (event.target.value);
    }

    const updateSecond = (event) => {
        setLastName (event.target.value);
    }

    const handleSliderChange = () => {
        console.log('Change event completed')
      };

    return (
    <div className='App'>
        <p className='headerText'>
            Add a new Judge
        </p>

        <a href='/'> Back to Home </a>


        <div className='search'>
            <div className='searchInputs'>

                <input
                    type="text"
                    placeholder= "Judge First Name"
                    onChange={updateFirst}
                />

                <input
                    type="text"
                    placeholder= "Judge Last Name"
                    onChange={updateSecond}
                />
                

                <button className='submitButton' onClick={addNewJudge}>Submit</button>
                
            </div>
        </div>


        <ToastContainer/>
        
    </div>
  )
}

export default AddJudge