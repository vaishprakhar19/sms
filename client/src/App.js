import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

import Register from "./screens/Register"
import React,{useEffect, useState} from 'react';
import Result from './screens/Result';
import TimeTable from './screens/TimeTable';
import MessMenu from './screens/MessMenu';
import MessTiming from './screens/MessTiming';
import Syllabus from './screens/Syllabus';
import Holidays from './screens/Holidays';
import PYQ from './screens/PYQ';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';


function App() {
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  // console.log(user);
  console.log(db.collection('user').doc(user.uid).get());

useEffect(async ()=>{
  const docRef = doc(db, "user",user.uid);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
})
  
  

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/register" element={<Register isRegistered={isRegistered} setIsRegistered={setIsRegistered} />}></Route>
          {user?
          <>
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}></Route>

          <Route path="/result" element={<Result/>}></Route>
          <Route path="/timetable" element={<TimeTable/>}></Route>
          <Route path="/messmenu" element={<MessMenu/>}></Route>
          <Route path="/messtiming" element={<MessTiming/>}></Route>
          <Route path="/syllabus" element={<Syllabus/>}></Route>
          <Route path="/holidays" element={<Holidays/>}></Route>
          <Route path="/pyq" element={<PYQ/>}></Route>
          <Route path="/mess_timing" element={<MessTiming />} ></Route>

          <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          
          </>
          :
          <>
          <Route path="/login" element={<Login user={user} setUser={setUser}/>}></Route>
          <Route path="*" element={<Navigate to="/login"/>}></Route>
          </>
}
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
