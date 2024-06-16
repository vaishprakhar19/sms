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
                            <div class="card__arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                                </svg>
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