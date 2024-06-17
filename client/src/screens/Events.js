// Events.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./events.css";
import { useAppState } from "../AppStateContext";

const Events = () => {
    const { isAdmin } = useAppState();
    const [events, setEvents] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({
        id: '',
        thumbnailImage: '',
        category: '',
        heading: '',
        author: '',
        date: '',
        driveLink: ''
    });
    // Set to true for now; in real applications, this would be determined by authentication logic.

    // const fetchEvents = () => {
    //     axios.get("/api/Events")
    //         .then(response => {
    //             setEvents(response.data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching holiday data:", error);
    //         });
    // };

    // useEffect(() => {
    //     fetchEvents();
    // }, []);

    // Dummy data for events
    const dummyEvents = [
        {
            id: 1,
            thumbnailImage: "https://drive.google.com/thumbnail?id=1xknl1Fr9F-4AG7iu6habiLx9ZNmKNcS8",
            category: "Farewell",
            heading: "Farewell 2024",
            date: "30 Jan 2024",
            driveLink: "https://drive.google.com/drive/folders/1MsFCABgCOLUVqrRRXlTw90u9sly73Jfr?usp=drive_link"
        },
        {
            id: 2,
            thumbnailImage: "image2.jpg",
            category: "Photography",
            heading: "Another interesting event heading",
            date: "30 Jan 2024",
            driveLink: "#"
        },
        {
            id: 3,
            thumbnailImage: "image3.jpg",
            category: "Music",
            heading: "This is a music event",
            date: "30 Jan 2024",
            driveLink: "#"
        },
        {
            id: 4,
            thumbnailImage: "image4.jpg",
            category: "Art",
            heading: "Art exhibition happening soon",
            date: "30 Jan 2024",
            driveLink: "#"
        },
        {
            id: 5,
            thumbnailImage: "image5.jpg",
            category: "Technology",
            heading: "Tech conference this week",
            date: "30 Jan 2024",
            driveLink: "#"
        }
    ];

    useEffect(() => {
        // Simulate fetching data
        setEvents(dummyEvents);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        setEvents([...events, { ...newEvent, id: events.length + 1 }]);
        setNewEvent({
            id: '',
            thumbnailImage: '',
            category: '',
            heading: '',
            author: '',
            date: '',
            driveLink: ''
        });
        setIsFormVisible(false);
    };

    return (
        <div>
            <div className="page-header">
                <h2>Events</h2>
                {isAdmin && (
                        <button className="adminbtn" onClick={() => setIsFormVisible(!isFormVisible)}>
                            {isFormVisible ? "Hide Form" : "Add New Event"}
                        </button>
                )}
            </div>
            <div className="page-layout">
            {isFormVisible && (
                            <form onSubmit={handleAddEvent} className="event-form">
                                <input type="text" className="inputField" name="thumbnailImage" placeholder="Thumbnail Image URL" value={newEvent.thumbnailImage} onChange={handleInputChange} required />
                                <input type="text" className="inputField" name="category" placeholder="Category" value={newEvent.category} onChange={handleInputChange} required />
                                <input type="text" className="inputField" name="heading" placeholder="Heading" value={newEvent.heading} onChange={handleInputChange} required />
                                <input type="text" className="inputField" name="author" placeholder="Author" value={newEvent.author} onChange={handleInputChange} required />
                                <input type="date" className="inputField" name="date" placeholder="Date" value={newEvent.date} onChange={handleInputChange} required />
                                <input type="text" className="inputField" name="driveLink" placeholder="Drive Link" value={newEvent.driveLink} onChange={handleInputChange} required />
                                <button type="submit" className="adminbtn">Add Event</button>
                            </form>
                        )}
                <div className="event-card-container">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <a href={event.driveLink}>
                                <div className="event-card-image" style={{ backgroundImage: `url(${event.thumbnailImage})` }}></div>
                                <div className="event-card-category">{event.category}</div>
                                <div className="event-card-heading">
                                    {event.heading}
                                    <div className="event-card-date">{event.date}</div>
                                </div>
                                <div className="card__arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

            </div>
            <Navbar />
        </div>
    );
};

export default Events;
