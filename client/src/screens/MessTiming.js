import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MessTiming.css";
import { useAppState } from "../AppStateContext";
import { Link } from "react-router-dom";
import BackHandler from "../components/BackHandler";

const MessTiming = () => {
  BackHandler();
  const [messTimings, setMessTimings] = useState([]);
  const [genderFilter, setGenderFilter] = useState("Boys");
  const [editMode, setEditMode] = useState(false);

  const { isAdmin } = useAppState();

  useEffect(() => {
    axios
      .get("/api/mess/timing")
      .then((response) => {
        setMessTimings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    const updatedTimings = messTimings.map((timing) => ({
      ...timing,
      timing: document.getElementById(`${timing.day}-${timing.meal_type}`).innerText
    }));

    axios
      .post("/api/mess/timing/update", { updatedTimings })
      .then((response) => {
        setMessTimings(response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredTimings = messTimings.filter(
    (timing) => timing.gender === genderFilter
  );
  const days = [...new Set(filteredTimings.map((timing) => timing.day))];

  return (
    <div>
      <header>
        <div className="page-header">
          <Link to="/dashboard">
            <h2>Mess Timings</h2>
          </Link>
          {isAdmin && (
            <div className="add-holiday-btn">
              <button className="adminbtn" onClick={handleEditToggle}>
                {editMode ? "Cancel" : "Edit"}
              </button>
              {editMode && (
                <button className="adminbtn" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      </header>
      <main className="page-layout">
        <div className="table-container">
          <div className="radio-inputs">
            <label className="radio">
              <input
                type="radio"
                value="Boys"
                checked={genderFilter === "Boys"}
                onChange={handleGenderChange}
              />
              <span className="name">Boys</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                value="Girls"
                checked={genderFilter === "Girls"}
                onChange={handleGenderChange}
              />
              <span className="name">Girls</span>
            </label>
          </div>

          <table className="table timing">
            <thead>
              <tr>
                <th>Meal Type</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Breakfast", "Lunch", "Snacks", "Dinner"].map((mealType) => (
                <tr key={mealType}>
                  <td>{mealType}</td>
                  {days.map((day) => {
                    const timing = filteredTimings.find(
                      (item) => item.day === day && item.meal_type === mealType
                    );
                    return (
                      <td
                        key={`${day}-${mealType}`}
                        id={`${day}-${mealType}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning={true} // Suppresses React warning
                      >
                        {timing ? timing.timing : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MessTiming;
