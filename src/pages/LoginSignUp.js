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
import Navbar from "../components/Navbar";

const LoginSignUp = () => {
    const navigate = useNavigate();
    const routeParams = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authUser, setAuthUser] = useState(null);
    

    const [SignUpEmail, SetSignUpEmail] = useState("");
    const [SignUpPassword, SetSignUpPassword] = useState("");
    const [CheckPassword, SetCheckPassword] = useState("");


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
            }
            else if(routeParams.redirect=="judges"){
                const tempNameVar = "/judges/"+routeParams.first+"/"+routeParams.last;
                navigate(tempNameVar, {replace: true});
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
        if(SignUpPassword !== CheckPassword){
          toast.error('Passwords do not match', {
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
                }
                else if(routeParams.redirect=="judges"){
                const tempNameVar = "/judges/"+routeParams.first+"/"+routeParams.last;
                navigate(tempNameVar, {replace: true});
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
    }


  
return (
  

<div className="items-center">
  <Navbar/>

    {!authUser ? (
      <div className="flex flex-col md:flex-row justify-center pt-20 ">

       <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl  bg-gray-100/90 border-2  border-gray-100 mr-20'>
       <h1 className='text-5xl font-semibold'>Log In</h1>
       <p className='font-medium text-lg text-gray-500 mt-4'>Sign In</p>
       <div className='mt-8'>
           <div className='flex flex-col'>
               <label className='text-lg font-medium'>Email</label>
               <input 
                   className='w-full border-2 bg-white border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                   placeholder="Enter your email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   />
           </div>
           <div className='flex flex-col mt-4'>
               <label className='text-lg font-medium'>Password</label>
               <input 
                   className='w-full border-2 bg-white border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                   placeholder="Enter your password"
                   type={"password"}
                   onChange={(e) => setPassword(e.target.value)}
               />
           </div>
           <div className='mt-8 flex justify-between items-center'>

           </div>
           <div className='mt-2 flex flex-col'>
               <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg' onClick={signIn}>Log in</button>

           </div>

           <a className=' flex flex-col mt-4 justify-center items-center font-medium  text-black font-bold hover:text-blue-400'>Forgot password?</a>

       </div>
    </div>




    <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl  bg-gray-100/90 border-2  border-gray-100 mt-5 md:mt-0'>
       <h1 className='text-5xl font-semibold'>Register</h1>
       <p className='font-medium text-lg text-gray-500 mt-4'>Sign Up</p>
       <div className='mt-8'>
           <div className='flex flex-col'>
               <label className='text-lg font-medium'>Email</label>
               <input 
                   className='w-full border-2 bg-white border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                   placeholder="Must be unique email"
                   value={SignUpEmail}
                   onChange={(e) => SetSignUpEmail(e.target.value)}
                   />
           </div>
           <div className='flex flex-col mt-4'>
               <label className='text-lg font-medium'>Password</label>
               <input 
                   className='w-full border-2 bg-white border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                   placeholder="Must be at least 6 characters"
                   type={"password"}
                   onChange={(e) => SetSignUpPassword(e.target.value)}
               />
           </div>
           <div className='flex flex-col mt-4'>
               <label className='text-lg font-medium'>Repeat Password</label>
               <input 
                   className='w-full border-2 bg-white border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                   placeholder="Must match password"
                   type={"password"}
                   onChange={(e) => SetCheckPassword(e.target.value)}
               />

           </div>
           <div className='mt-8 flex justify-between items-center'/>

           <div className='mt-2 flex flex-col'>
               <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg' onClick={signUp}>Register</button>
           </div>
       </div>
   </div>

      <ToastContainer/>

   </div>

    ) : (
        <>
        <p>{`Signed In as ${authUser.email}`}</p>
        <button onClick={userSignOut}>Sign Out</button>
        </>
    )}

</div>

    );
};
  
export default LoginSignUp;