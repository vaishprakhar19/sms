// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAui1NvPnj_5jC-bPPaEvVPMV55O9Bohyk",
  authDomain: "student-portal-46087.firebaseapp.com",
  projectId: "student-portal-46087",
  storageBucket: "student-portal-46087.appspot.com",
  messagingSenderId: "551987077363",
  appId: "1:551987077363:web:41c97948c0d6801b8a1786",
  measurementId: "G-1L0HBR0MTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export {auth,provider,app}
