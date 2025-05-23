import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Result from "./screens/Result";
import TimeTable from "./screens/TimeTable";
import MessMenu from "./screens/MessMenu";
import MessTiming from "./screens/MessTiming";
import Syllabus from "./screens/Syllabus";
import Holidays from "./screens/Holidays";
import PYQ from "./screens/PYQ";
import Loader from "./screens/Loader";
import AdminLogin from "./screens/AdminLogin";
import Notice from "./screens/Notice";
import Events from "./screens/Events";
import { useAppState } from "./AppStateContext";
import Todo from "./screens/Todo";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Students from "./screens/Students";
import axios from "axios";
import Showresult from "./screens/Showresult";
function App() {
  const {
    setLoading,
    user,
    setUser,
    isRegistered,
    setIsRegistered,
    isAdmin,
    setIsAdmin,
    setStatesSet,
    statesSet,
    setSemester,
    setStream,
    stream,
    semester,
  } = useAppState();

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  axios.defaults.withCredentials = true;

  // index.js or App.js

  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered with scope: ", registration.scope);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed: ", error);
  //       });
  //   });
  // }

  const fetchUserDetails = async (uid) => {
    try {
      if (user) {
        console.log("Fetching user details..."); // Debug log 1
        const response = await fetch(
          `https://biasportalback.vercel.app/userdata/${uid}`
        );
        const data = await response.json();
        console.log("API Response:", data); // Debug log 2
        setStream(data.stream);
        setSemester(data.currentSemester);
        console.log("States updated with:", data.stream, data.currentSemester); // Debug log 3
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add this new useEffect to monitor stream and semester changes
  useEffect(() => {
    console.log("Current values - Stream:", stream, "Semester:", semester);
  }, [stream, semester]);

  // Add this new useEffect before the auth listener useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));

        getDoc(doc(db, "user", authUser.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            setIsRegistered(docSnap.data().isRegistered);
            setIsAdmin(docSnap.data().isAdmin);
          } else {
            setDoc(doc(db, "user", authUser.uid), {
              isRegistered: false,
              isAdmin: false,
            });
          }
          setStatesSet(true);
          if (!isAdmin) fetchUserDetails(authUser.uid);
        });
      } else {
        setUser(null);
        localStorage.clear();
        setIsRegistered(null);
        setIsAdmin(null);
        setStatesSet(true);
      }
    });

    return () => unsubscribe();
  }, [stream, semester]);

  let routes = null;

  if (statesSet) {
    routes = (
      <>
        <Route path="/result/:resultId" element={<Showresult />} />
        {user && isRegistered ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/notice"
              element={
                isAdmin ? <Notice /> : <Navigate to="/dashboard" replace />
              }
            />
            <Route path="/todo" element={<Todo />} />
            <Route path="/events" element={<Events />} />
            <Route path="/result" element={<Result />} />
            <Route path="/messmenu" element={<MessMenu />} />
            <Route path="/messtiming" element={<MessTiming />} />
            <Route
              path="/syllabus"
              element={
                <Syllabus pdfUrl="https://drive.google.com/file/d/1mqX-jL8w-lrPFqnb2wwesUEjt2o6omRe/view?usp=sharing" />
              }
            />
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/pyq" element={<PYQ />} />
            <Route path="/mess_timing" element={<MessTiming />} />
            <Route path="/students" element={<Students />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route
              path="/adminlogin"
              element={
                <AdminLogin
                  setUser={setUser}
                  setIsRegistered={setIsRegistered}
                  user={user}
                  setLoading={setLoading}
                  setIsAdmin={setIsAdmin}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  setLoading={setLoading}
                  setIsAdmin={setIsAdmin}
                  setStatesSet={setStatesSet}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register user={user} setIsRegistered={setIsRegistered} />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </>
    );
  }

  return (
    <div className="App">
      <Router>
        {statesSet ? <Routes>{routes}</Routes> : <Loader loading={true} />}
      </Router>
    </div>
  );
}

export { App };
