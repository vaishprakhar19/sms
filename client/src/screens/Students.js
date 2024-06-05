// UserTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./Students.css"

const Students = () => {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
      semester: '',
      department: '',
      gender: ''
    });
  
    const fetchUsers = () => {
      const params = {
        semester: filters.semester,
        department: filters.department,
        gender: filters.gender
      };
  
      axios.get("/api/users", { params })
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    };
  
    useEffect(() => {
      fetchUsers();
    }, [filters]);
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
    };
  
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(users);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      XLSX.writeFile(workbook, "users.xlsx");
    };
  
    return (
      <div>
        <div className="page-header">

        <h2>User Data</h2>
        </div>
        <div className="page-layout">
            <div className="form_main notice-form">

          
            
            <input type="text" placeholder="Batch" className="inputField" name="semester" value={filters.semester} onChange={handleFilterChange} />
          
          <div className="radio-inputs">
   
    <div className="radio">
      <label className="radio">
        <input
          type="radio"
          name="department"
          value="cse"
          checked={filters.department === "cse"}
          onChange={handleFilterChange}
        />
        <span className="name">CSE</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="department"
          value="ece"
          checked={filters.department === "ece"}
          onChange={handleFilterChange}
        />
        <span className="name">ECE</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="department"
          value="mca"
          checked={filters.department === "mca"}
          onChange={handleFilterChange}
        />
        <span className="name">MCA</span>
      </label>
    </div>
  
</div>

<div className="radio-inputs">

   
    <div className="radio">
      <label className="radio">
        <input
          type="radio"
          name="gender"
          value="male"
          checked={filters.gender === "male"}
          onChange={handleFilterChange}
        />
        <span className="name">Male</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="gender"
          value="female"
          checked={filters.gender === "female"}
          onChange={handleFilterChange}
        />
        <span className="name">Female</span>
      </label>
    </div>
  
</div>

          <button id="button" onClick={fetchUsers}>Filter</button>
            </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Mobile</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Gender</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.uid}>
            
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.rollNo}</td>
                <td>{user.batch}</td>
                <td>{user.gender}</td>
                <td>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="button" onClick={exportToExcel}>Export to Excel</button>
      </div>
    );
  };

export default Students;