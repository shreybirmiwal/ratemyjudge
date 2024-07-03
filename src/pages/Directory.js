import React from 'react'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar'

function Directory() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const temp = [];
    const querySnapshot = await getDocs(collection(db, "votes"));
    querySnapshot.forEach((doc) => {
      temp.push(doc.id)
    });

    setData(temp)
  }


  return (
    <div className='h-screen relative'>
      <Navbar />

      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
      <h1 className='p-16'>Directory</h1>

      {data.length != 0 && (
        <div className='absolute top-0 -mt-10  h-full flex flex-col justify-center ml-5 text-black p-4'>


          <div className='bg-pink-600'>
            {data.map((value, key) => {

              const arr = value.split(' ')

              const temp = "/Judges/" + arr[0] + "/" + arr[1]

              return (
                <a className="" key={value} href={temp}>
                  <p>{value} </p>
                </a>
              );
            })}

          </div>
        </div>

      )}

    </div>
  )
}

export default Directory