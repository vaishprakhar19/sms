// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAui1NvPnj_5jC-bPPaEvVPMV55O9Bohyk",
  authDomain: "student-portal-46087.firebaseapp.com",
  projectId: "student-portal-46087",
  storageBucket: "student-portal-46087.appspot.com",
  messagingSenderId: "551987077363",
  appId: "1:551987077363:web:41c97948c0d6801b8a1786",
  measurementId: "G-1L0HBR0MTM"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth();
export {auth,provider,app,db}
