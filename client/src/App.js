import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import React,{useState} from 'react'
import MessTiming from './screens/MessTiming';

function App() {
  const [user, setUser] = useState(null);
  // console.log(user);
  return (
    <div className="App">
      <Router>
        <Routes>
          {user?
          <>
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}></Route>
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
