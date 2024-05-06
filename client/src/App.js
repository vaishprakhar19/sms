import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
// import { auth, db, provider } from "./firebase";
import Register from "./screens/Register"
import React, {useState} from 'react';
import Result from './screens/Result';
import TimeTable from './screens/TimeTable';
import MessMenu from './screens/MessMenu';
import MessTiming from './screens/MessTiming';
import Syllabus from './screens/Syllabus';
import Holidays from './screens/Holidays';
import PYQ from './screens/PYQ';
import Loader from './screens/Loader';
import Internal from './screens/Internal';
import AdminLogin from './screens/AdminLogin';
import Notice from './screens/Notice';
import { useAppState } from './AppStateContext';
import { logDOM } from '@testing-library/react';





function App() {
  const { loading, setLoading, user, setUser, isRegistered, setIsRegistered, isAdmin, setIsAdmin } = useAppState();

console.log(isAdmin);
return (
    
    <div className="App">
      <Loader loading={loading}/>
      <Router>
        <Routes>
          <Route path="/internal" element={<Internal/>}></Route>
          {user && isRegistered ?
            <>
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />}></Route>
              <Route path="/notice" element={isAdmin ? <Notice /> : <Navigate to="/dashboard" />}></Route>
              <Route path="/result" element={<Result />}></Route>
              <Route path="/messmenu" element={<MessMenu />}></Route>
              <Route path="/messtiming" element={<MessTiming />}></Route>
              <Route path="/syllabus" element={<Syllabus />}></Route>
              <Route path="/timetable" element={<TimeTable />}></Route>
              <Route path="/holidays" element={<Holidays />}></Route>
              <Route path="/pyq" element={<PYQ />}></Route>
              <Route path="/mess_timing" element={<MessTiming />} ></Route>
              <Route path="*" element={<Navigate to="/dashboard" />}></Route>
            </>
            :
            <>
               <Route path="/adminlogin" element={<AdminLogin setUser={setUser} setIsRegistered={setIsRegistered} user={user} setLoading={setLoading} setIsAdmin={setIsAdmin} />}></Route>
               <Route path="/login" element={<Login user={user} setUser={setUser} isRegistered={isRegistered} setIsRegistered={setIsRegistered} setLoading={setLoading}/>}></Route>
               <Route path="/register" element={<Register user={user} setIsRegistered={setIsRegistered} />}></Route>
               <Route path="*" element={<Navigate to="/login" />}></Route>
            </>
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
