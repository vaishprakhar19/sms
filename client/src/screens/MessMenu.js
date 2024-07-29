import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from "../AppStateContext";
import "./messmenu.css"
import { Link } from "react-router-dom";
import BackHandler from '../components/BackHandler';
import Navbar from '../components/Navbar';
const MessMenu = () => {
  BackHandler();
  const [menuData, setMenuData] = useState([]);
  const { isAdmin } = useAppState()
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('https://biasportalback.vercel.app/api/mess_menu'); // Adjust endpoint as per your backend
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching mess menu:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Send edited data to backend to store in database
      await axios.post('https://biasportalback.vercel.app/api/update_mess_menu', menuData); // Adjust endpoint as per your backend
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating mess menu:', error);
    }
  };

  return (
    <div>
      <div className='page-header'>
        <Link to="/dashboard">
          <h2>Mess Menu</h2>
        </Link>
        {isAdmin && (
          <div className='add-holiday-btn'>
            <button className="adminbtn" onClick={handleEdit}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button className="adminbtn" onClick={handleSave}>Save</button>
            )}
          </div>
        )}
      </div>
      <div className='page-layout'>
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Evening Snacks</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((item, index) => (
                <tr key={item.menu_id}>
                  <td >{item.day_of_week}</td>
                  <td contentEditable={isEditing} onBlur={(e) => {
                    menuData[index].breakfast = e.target.innerText;
                  }}>{item.breakfast}</td>
                  <td contentEditable={isEditing} onBlur={(e) => {
                    menuData[index].lunch = e.target.innerText;
                  }}>{item.lunch}</td>
                  <td contentEditable={isEditing} onBlur={(e) => {
                    menuData[index].evening_snacks = e.target.innerText;
                  }}>{item.evening_snacks}</td>
                  <td contentEditable={isEditing} onBlur={(e) => {
                    menuData[index].dinner = e.target.innerText;
                  }}>{item.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default MessMenu;
