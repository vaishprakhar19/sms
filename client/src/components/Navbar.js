import React, { useState } from 'react';
import './navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // Redirect based on the selected option
    switch (selectedValue) {
      case 'home':
        navigate("/dashboard")
        break;
      case 'todo':
        navigate("/todo")
        break;
      // Add more cases for additional options if needed
      default:
        // Handle default case
        break;
    }
  };

  return (
    <>
      <nav className="navbar">
        <label title="home" htmlFor="home" className="nav-label">
          <input id="home" name="page" value="home" type="radio" onChange={handleOptionChange} checked={location.pathname === "/dashboard"} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 20"
            height="20"
            width="21"
            className="icon home"
          >
            <path
              fill="inherit"
              d="M18.9999 6.01002L12.4499 0.770018C11.1699 -0.249982 9.16988 -0.259982 7.89988 0.760018L1.34988 6.01002C0.409885 6.76002 -0.160115 8.26002 0.0398848 9.44002L1.29988 16.98C1.58988 18.67 3.15988 20 4.86988 20H15.4699C17.1599 20 18.7599 18.64 19.0499 16.97L20.3099 9.43002C20.4899 8.26002 19.9199 6.76002 18.9999 6.01002ZM10.9199 16C10.9199 16.41 10.5799 16.75 10.1699 16.75C9.75988 16.75 9.41988 16.41 9.41988 16V13C9.41988 12.59 9.75988 12.25 10.1699 12.25C10.5799 12.25 10.9199 12.59 10.9199 13V16Z"
            ></path>
          </svg>
        </label>
        <label title="favorite" htmlFor="favorite" className="nav-label">
          <input id="favorite" name="page" type="radio" value="" onChange={handleOptionChange} checked={location.pathname === ""} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            viewBox="0 0 20 18"
            height="18"
            width="20"
            className="icon favorite"
          >
            <path
              fill="inherit"
              d="M14.44 0C12.63 0 11.01 0.88 10 2.23C9.48413 1.53881 8.81426 0.977391 8.04353 0.590295C7.27281 0.203198 6.42247 0.00108555 5.56 0C2.49 0 0 2.5 0 5.59C0 6.78 0.19 7.88 0.52 8.9C2.1 13.9 6.97 16.89 9.38 17.71C9.72 17.83 10.28 17.83 10.62 17.71C13.03 16.89 17.9 13.9 19.48 8.9C19.81 7.88 20 6.78 20 5.59C20 2.5 17.51 0 14.44 0Z"
            ></path>
          </svg>
        </label>
        <label title="notifications" htmlFor="notifications" className="nav-label">
          <input id="notifications" value="todo" name="page" type="radio" onChange={handleOptionChange} checked={location.pathname === "/todo"} />
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-align-box-left-top">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-10.333 9h-2l-.117 .007a1 1 0 0 0 .117 1.993h2l.117 -.007a1 1 0 0 0 -.117 -1.993zm4 -3h-6l-.117 .007a1 1 0 0 0 .117 1.993h6l.117 -.007a1 1 0 0 0 -.117 -1.993zm-2 -3h-4l-.117 .007a1 1 0 0 0 .117 1.993h4l.117 -.007a1 1 0 0 0 -.117 -1.993z" />
          </svg>
        </label>
      </nav>
    </>
  )
}

export default Navbar