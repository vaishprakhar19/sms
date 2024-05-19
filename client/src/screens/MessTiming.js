
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MessTiming.css"; 

const MessTiming = () => {
    const [messTimings, setMessTimings] = useState([]);
    const [genderFilter, setGenderFilter] = useState("Boys");

    useEffect(() => {
        axios.get("/api/mess/timing")
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

    const filteredTimings = messTimings.filter((timing) => timing.gender === genderFilter);

    const days = [...new Set(filteredTimings.map((timing) => timing.day))];

    return (

        <div>
        <header>
          <div className='page-header'>
           
            <h2>Mess Timings</h2>
          </div>
        </header>
        <main className="page-layout">

        <div className="mess-timing-container "> 
            <div className="gender-filter">
                <label>
                    <input
                        type="radio"
                        value="Boys"
                        checked={genderFilter === "Boys"}
                        onChange={handleGenderChange}
                    />
                    Boys
                </label>
                <label>
                    <input
                        type="radio"
                        value="Girls"
                        checked={genderFilter === "Girls"}
                        onChange={handleGenderChange}
                    />
                    Girls
                </label>
            </div>
            <button className="mess-btn" onClick={() => setGenderFilter("Boys")}>Reset Filter</button>
            <table className="table">
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
                                const timing = filteredTimings.find((item) => item.day === day && item.meal_type === mealType);
                                return <td key={`${day}-${mealType}`}>{timing ? (timing.timing).toString().slice(0,5) : "-"}</td>;
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
