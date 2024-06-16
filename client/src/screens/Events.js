// Events.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./events.css";

const Events = () => {
    const [events, setEvents] = useState([]);

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

    // Dummy data for events
    const dummyEvents = [
        {
            id: 1,
            image: "image1.jpg",
            category: "Illustration",
            heading: "A heading that must span over two lines",
            author: "Abi",
            daysAgo: 4
        },
        {
            id: 2,
            image: "image2.jpg",
            category: "Photography",
            heading: "Another interesting event heading",
            author: "Ben",
            daysAgo: 2
        },
        {
            id: 3,
            image: "image3.jpg",
            category: "Music",
            heading: "This is a music event",
            author: "Cara",
            daysAgo: 5
        },
        {
            id: 4,
            image: "image4.jpg",
            category: "Art",
            heading: "Art exhibition happening soon",
            author: "Dani",
            daysAgo: 3
        },
        {
            id: 5,
            image: "image5.jpg",
            category: "Technology",
            heading: "Tech conference this week",
            author: "Eli",
            daysAgo: 1
        }
    ];

    useEffect(() => {
        // Simulate fetching data
        setEvents(dummyEvents);
    }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Events</h2>
            </div>
            <div className="page-layout">
                <div className="event-card-container">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <div className="event-card-image" style={{ backgroundImage: `url(${event.image})` }}></div>
                            <div className="event-card-category">{event.category}</div>
                            <div className="event-card-heading">
                                {event.heading}
                                <div className="event-card-author">By <span className="name">{event.author}</span> {event.daysAgo} days ago</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Events;