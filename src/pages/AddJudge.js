import React from 'react'
import "./AddJudge.css";
import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc, query } from "firebase/firestore";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddJudge() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [judgeTotal, setJudgeTotal] = useState([]);

    useEffect(() => {
        const temp = []

        const q = query(collection(db, "judge"));

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
                tech_truth: 5.0,
                lay_flow_flaw: 5.0,
                talking_speed: 5.0,
                aff_neg_percentage: 50.0,
                total_votes: 0,
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

        }
    }
    
    const updateFirst = (event) => {
        setFirstName (event.target.value);
    }

    const updateSecond = (event) => {
        setLastName (event.target.value);
    }

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