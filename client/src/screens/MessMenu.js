import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from "../AppStateContext";
import "./messmenu.css"

const MessMenu = () => {
  const [menuData, setMenuData] = useState([]);
 const {isAdmin}=useAppState()
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('/api/mess_menu'); // Adjust endpoint as per your backend
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
      await axios.post('/api/update_mess_menu', menuData); // Adjust endpoint as per your backend
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating mess menu:', error);
    }
  };

  return (
    <div>
      <div className='page-header'>
        <h2>Mess Menu</h2>
        {isAdmin && (
          <button onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
        {isEditing && (
          <button onClick={handleSave}>Save</button>
        )}
      </div>
      <div className='page-layout'>
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
                <td>{item.day_of_week}</td>
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
  );
};

export default MessMenu;
