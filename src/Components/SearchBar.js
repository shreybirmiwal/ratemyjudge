import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function SearchBar({ placeholder}) {
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

    <div className="search">

      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            
            const arr = value.split(' ')

            const temp = "/Judges/" + arr[0]+"/"+arr[1]

            return (
              <a className="dataItem" key={value} href={temp}>
                <p>{value} </p>
              </a>
            );
          })}

        </div>
      )}

      <div className="notHere">
        {authUser ? (

        <a className="dataItem" href="/AddJudge">
          <p>Judge not here?</p>
        </a>

        ):(
          <a className="dataItem" href="/account/AddJudge/x/x">
            <p>Judge not here?</p>
          </a>
        )}

      </div>

    </div>

  );
}

export default SearchBar;