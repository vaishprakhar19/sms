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

        <div className='dashboard'>
        <header>
          <div className='user-profile'>
           
            <p>Mess Timings</p>
          </div>
        </header>
        <main>

        <div className="mess-timing-container"> 
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
            <button onClick={() => setGenderFilter("Boys")}>Reset Filter</button>
            <table className="mess-timing-table">
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
                                return <td key={`${day}-${mealType}`}>{timing ? timing.timing : "-"}</td>;
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
