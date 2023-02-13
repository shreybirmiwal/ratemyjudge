import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Hero = () => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [data, setData] = useState([])
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
        const temp = [];
  
        const querySnapshot = await getDocs(collection(db, "votes"));
        querySnapshot.forEach((doc) => {
         // console.log(doc.id, " => ", doc.data());
          temp.push(doc.id)
        });
        
        setData(temp)
    }
    
  
    const handleFilter = (event) => {
     // console.log(data)
  
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };


    return (
    <div className='w-full h-screen relative'>

      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
        <h1>Search for Judges...</h1>
        <h2 className='py-4'></h2>
        <form
          className='flex justify-between items-center max-w-[700px] mx-auto w-full border p-1
          rounded-md text-black bg-gray-100/90'
        >
          <div>
            <input
              className='bg-transparent w-[450px] sm:w-[610px] font-[Poppins] focus:outline-none ml-4'
              type='text'
            placeholder="Start typing..."
              value={wordEntered}
              onChange={handleFilter}
            />
          </div>
          
          <div>
            <button>
              <AiOutlineSearch size={20} className='icon' style={{color: '#ffffff'}}  />
            </button>
          </div>
          
        </form>

        {filteredData.length != 0 && (
            <div >

                {filteredData.slice(0, 15).map((value, key) => {
                    
                    const arr = value.split(' ')

                    const temp = "/Judges/" + arr[0]+"/"+arr[1]

                    return (
                    <a className='flex justify-between items-center max-w-[700px] mx-auto w-full border p-1
                    text-black bg-gray-100/90 p-5 mt-1' key={value} href={temp}>
                        <p>{value} </p>
                    </a>
                );
            })}

            </div>
        )}

        <div>
            {authUser ? (

                <a className='flex justify-between items-center max-w-[700px] mx-auto w-full border p-1
                text-black bg-blue-300 border-blue-300 p-5 mt-1' href="/AddJudge">
                <p>Judge not here?</p>
                </a>

            ):(
                <a className='flex justify-between items-center max-w-[700px] mx-auto w-full border p-1
                text-black bg-blue-300 border-blue-300 p-5 mt-1' href="/account/AddJudge/x/x">
                    <p>Judge not here?</p>
                </a>
            )}

        </div>

      </div>
      

      <div className='absolute bottom-0 content-center p-5'>
        <h3> shrey birmiwal</h3>
        <a className="hover:bg-blue-300" href='https://github.com/shreybirmiwal/ratemyjudge'> github </a>
        <a className="hover:bg-blue-300" href='https://www.instagram.com/shrey.birmiwal/'> instagram </a>

      </div>

    </div>
  );
};

export default Hero;