import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./messmenu.css"
const MessMenu = () => {
  const [menuData, setMenuData] = useState([]);

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

  return (
    <div>
      <div className='page-header'>
        <h2>Mess Menu</h2>
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
            {menuData.map((item) => (
              <tr key={item.menu_id}>
                <td>{item.day_of_week}</td>
                <td>{item.breakfast}</td>
                <td>{item.lunch}</td>
                <td>{item.evening_snacks}</td>
                <td>{item.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default MessMenu;