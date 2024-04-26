import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import { auth, db, provider } from "./firebase";
import Register from "./screens/Register"
import React, {useEffect, useState } from 'react';
import Result from './screens/Result';
import TimeTable from './screens/TimeTable';
import MessMenu from './screens/MessMenu';
import MessTiming from './screens/MessTiming';
import Syllabus from './screens/Syllabus';
import Holidays from './screens/Holidays';
import PYQ from './screens/PYQ';
import Loader from './screens/Loader';
;


function App() {
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(() => {
    // Initialize loading state from localStorage or default to true
    return localStorage.getItem('loading') === 'true' ? true : false;
  });
return (
    
    <div className="App">
      <Loader loading={loading}/>
      <Router>
        <Routes>
          {user && isRegistered ?
            <>
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />}></Route>
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
