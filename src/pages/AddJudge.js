import React from 'react'
import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc, query } from "firebase/firestore";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'; 
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from '../Components/Navbar.js';

function AddJudge() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [judgeTotal, setJudgeTotal] = useState([]);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const temp = []

        const q = query(collection(db, "votes"));

        const querySnapshot =  getDocs(q).then(querySnapshot =>{
            querySnapshot.forEach((doc) => {

                //console.log(doc.id, " => ", doc.data());
                temp.push(doc.id.toLowerCase())

              })
        }
           
        )
        
        setJudgeTotal(temp)

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

    }, [])

    const addNewJudge = async () => {

        if(!authUser){
            navigate("/Account/AddJudge/x/x",{replace:true});
        } else {

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
    }
    
    const updateFirst = (event) => {
        setFirstName (event.target.value);
    }

    const updateSecond = (event) => {
        setLastName (event.target.value);
    }

    return (
        <div className='w-full h-screen relative'>
        <Navbar/>

        <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
          
          <h1>Add a Judge</h1>
          <h2 className='py-4'></h2>

          <div
            className='flex flex-col md:flex-row justify-between items-center max-w-[700px] mx-auto w-full  p-1
            rounded-md text-black '>
                <input
                   className='w-full border-2 bg-white border-gray-100 rounded-xl p-4 md:mr-1.5 mt-1 bg-transparent'
                   type='text'
                    placeholder="First Name"
                    onChange={updateFirst}/>

                <input
                   className='w-full border-2 bg-white rounded-xl p-4 md:ml-1.5 mt-1 bg-transparent'
                   type='text'
                    placeholder="Last Name"
                    onChange={updateSecond}/>
                

                <button className='m-5 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg' onClick={addNewJudge}>Submit</button>
            
          </div>
  
  
        </div>
            <ToastContainer/>
      </div>
  )
}

export default AddJudge