import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
<<<<<<< HEAD:src/App.js
import Register from "./screens/Register"
import React,{useState} from 'react';
import Result from './screens/Result';
import TimeTable from './screens/TimeTable';
import MessMenu from './screens/MessMenu';
import MessTiming from './screens/MessTiming';
import Syllabus from './screens/Syllabus';
import Holidays from './screens/Holidays';
import PYQ from './screens/PYQ';
=======
import React,{useState} from 'react'
import MessTiming from './screens/MessTiming';
>>>>>>> 8872c4f8174782e0a1eedd998b001117bee31470:client/src/App.js

function App() {
  const [user, setUser] = useState(null);
  // console.log(user);
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/register" element={<Register/>}></Route>
          {user?
          <>
         
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}></Route>
<<<<<<< HEAD:src/App.js
          <Route path="/result" element={<Result/>}></Route>
          <Route path="/timetable" element={<TimeTable/>}></Route>
          <Route path="/messmenu" element={<MessMenu/>}></Route>
          <Route path="/messtiming" element={<MessTiming/>}></Route>
          <Route path="/syllabus" element={<Syllabus/>}></Route>
          <Route path="/holidays" element={<Holidays/>}></Route>
          <Route path="/pyq" element={<PYQ/>}></Route>
=======
          <Route path="/mess_timing" element={<MessTiming />} ></Route>
>>>>>>> 8872c4f8174782e0a1eedd998b001117bee31470:client/src/App.js
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
