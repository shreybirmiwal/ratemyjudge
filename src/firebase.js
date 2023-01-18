// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAA_i6A9mLGaEbRS3CFXBr7P4mp9PQhRRY",
  authDomain: "ratemyjudge-b2a39.firebaseapp.com",
  projectId: "ratemyjudge-b2a39",
  storageBucket: "ratemyjudge-b2a39.appspot.com",
  messagingSenderId: "240717791004",
  appId: "1:240717791004:web:b5a255b3844fbf0ce084d9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();