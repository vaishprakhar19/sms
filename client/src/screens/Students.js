import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./Students.css";
import { Link } from "react-router-dom";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    semester: "",
    department: "",
    gender: "",
  });

  const fetchUsers = () => {
    const params = {
      semester: filters.semester,
      department: filters.department,
      gender: filters.gender,
    };

    axios
      .get("/api/users", { params })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
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

  const clearSelection = () => {
    setFilters({
      semester: "",
      department: "",
      gender: "",
    });
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
        <Link to="/dashboard">
          <h2>User Data</h2>
        </Link>
      </div>
      <div className="page-layout">
        <div className="user-form">
          <input
            type="text"
            placeholder="Batch"
            className="inputField"
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
          />
          <div className="user-radios">
            <div className="radio-inputs user-radio">
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
              <div className="radio male">
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
                <label className="radio female">
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
          </div>

          <button id="button" onClick={clearSelection}>
            Clear Selection
          </button>
        </div>
        <div className="table-container">
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
              {users.map((user) => (
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
        </div>
        <button id="button" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default Students;
