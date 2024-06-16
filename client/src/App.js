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
import React, { useEffect } from "react";
import Result from "./screens/Result";
import TimeTable from "./screens/TimeTable";
import MessMenu from "./screens/MessMenu";
import MessTiming from "./screens/MessTiming";
import Syllabus from "./screens/Syllabus";
import Holidays from "./screens/Holidays";
import PYQ from "./screens/PYQ";
import Loader from "./screens/Loader";
import Internal from "./screens/Internal";
import AdminLogin from "./screens/AdminLogin";
import Notice from "./screens/Notice";
import { useAppState } from "./AppStateContext";
import Todo from "./screens/Todo";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Students from "./screens/Students";


function App() {
  const {
    loading,
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
    semester
  } = useAppState();

  // console.log("user", user);
  // console.log("isAdmin", isAdmin);
  // console.log("isRegistered", isRegistered);
  // console.log("statesSet", statesSet);

  const fetchUserDetails = async (uid) => {
    try {
      const response = await fetch(`/userdata/${uid}`);
      const data = await response.json();
      await setStream(data.stream);
      await setSemester(data.currentSemester);
      console.log(stream, "stream")
      console.log(semester, "sem")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // setLoading(true);
        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));

        // Check if the user is registered
        getDoc(doc(db, "user", authUser.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            setIsRegistered(docSnap.data().isRegistered);
            setIsAdmin(docSnap.data().isAdmin);
            // setLoading(true);
            // localStorage.setItem("loading", "true");
          } else {
            setDoc(doc(db, "user", authUser.uid), { isRegistered: false, isAdmin: false });
          }
          // setLoading(false);
          setStatesSet(true);
          if (!isAdmin) fetchUserDetails(authUser.uid);
        });

      } else {
        // User is signed out
        setUser(null);
        localStorage.clear();
        setIsRegistered(null);
        setIsAdmin(null);
        setStatesSet(true);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [stream, semester]);

  let routes = null;

  if (statesSet) {
    routes = (
      <>
        {user && isRegistered ? (
          <>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/notice"
              element={
                isAdmin ? <Notice /> : <Navigate to="/dashboard" replace />
              }
            />
            <Route path="/todo" element={<Todo />} />
            <Route path="/result" element={<Result />} />
            <Route path="/messmenu" element={<MessMenu />} />
            <Route path="/messtiming" element={<MessTiming />} />
            <Route path="/syllabus" element={<Syllabus />} />
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