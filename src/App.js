import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import React,{useState} from 'react'


function App() {
  const [user, setUser] = useState(null);
  // console.log(user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user}/>}></Route>
          <Route path="/login" element={<Login user={user} setUser={setUser}/>}></Route>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
