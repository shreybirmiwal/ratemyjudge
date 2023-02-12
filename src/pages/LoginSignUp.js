import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const LoginSignUp = () => {
    const navigate = useNavigate();
    const routeParams = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authUser, setAuthUser] = useState(null);


    const [SignUpEmail, SetSignUpEmail] = useState("");
    const [SignUpPassword, SetSignUpPassword] = useState("");


    useEffect(() => {
        
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
    
      const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
          })
          .catch((error) => console.log(error));
      };

    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
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

            if(routeParams.redirect == "Home"){
                navigate("/", { replace: true });
            }
            else if(routeParams.redirect == "AddJudge"){
                navigate("/AddJudge", { replace: true });
            }
            else if(routeParams.redirect=="Vote"){
                const tempNameVar = "/Vote/"+routeParams.first+"/"+routeParams.last;
                navigate(tempNameVar, {replace: true});
                console.log(routeParams.redirect)
            }

        })
        .catch((error) => {
          console.log(error);
          toast.error('Failed to login', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        });
    };


    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, SignUpEmail, SignUpPassword)
          .then((userCredential) => {
            console.log(userCredential);
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

                if(routeParams.redirect == "Home"){
                    navigate("/", { replace: true });
                }
                else if (routeParams.redirect == "AddJudge"){
                    navigate("/AddJudge", { replace: true });
                }
                else if(routeParams.redirect=="Vote"){
                    const tempNameVar = "/Vote/"+routeParams.first+"/"+routeParams.last;
                    navigate(tempNameVar, {replace: true});
                    console.log(routeParams.redirect)
                }
          })
          .catch((error) => {
            console.log(error);
            toast.error('Failed to signup', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
          });
      };


  
return (

<div>
    {!authUser ? (   
      <div className="sign-in-container">


      <a href='/'> back to home </a>

      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
      

      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
            type="email"
            placeholder="Enter your email"
            value={SignUpEmail}
            onChange={(e) => SetSignUpEmail(e.target.value)}
        ></input>
        <input
            type="password"
            placeholder="Enter your password"
            value={SignUpPassword}
            onChange={(e) => SetSignUpPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
        </form>
      
        <ToastContainer/>

        </div>

    ) : (
        <>
        <p>{`Signed In as ${authUser.uid}`}</p>
        <button onClick={userSignOut}>Sign Out</button>
        </>
    )}

</div>

    );
};
  
export default LoginSignUp;