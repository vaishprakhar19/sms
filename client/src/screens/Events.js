// Events.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./events.css";

const Events = () => {
    const [Events, setEvents] = useState([]);

    // const fetchEvents = () => {
    //     axios.get("/api/Events")
    //         .then(response => {
    //             setEvents(response.data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching holiday data:", error);
    //         });
    // };
    // console.log(Events);
    // useEffect(() => {
    //     fetchEvents();
    // }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Events</h2>
            </div>
            <div className="page-layout">
                {/* <div className="table-container">
                </div> */}

            </div>
            <Navbar />
        </div>
    );
};

export default Events;
