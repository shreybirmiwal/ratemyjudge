import React from 'react'
import "./AddJudge.css";
import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

function AddJudge() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const addNewJudge = () => {
        console.log("Add new Judge")
        console.log(firstName);
        console.log(lastName);

        setDoc(doc(db, "judge", (firstName+" "+lastName)), {
            tech_truth: 5.0,
            lay_flow_flaw: 5.0,
            talking_speed: 5.0,
            aff_neg_percentage: 50.0,
            total_votes: 0,
          });
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

        
    </div>
  )
}

export default AddJudge