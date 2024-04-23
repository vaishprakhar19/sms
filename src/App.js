import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" Component={Login}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
