import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./events.css";
import { useAppState } from "../AppStateContext";

const Events = () => {
  const { isAdmin } = useAppState();
  const [events, setEvents] = useState([]);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newEvent, setNewEvent] = useState({
    thumbnailImage: '',
    category: '',
    heading: '',
    date: '',
    driveLink: ''
  });

  const fetchEvents = () => {
    axios.get("/api/events")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events data:", error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const transformDriveUrl = (url) => {
    const match = url.match(/file\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : url;
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const transformedEvent = {
      ...newEvent,
      thumbnailImage: transformDriveUrl(newEvent.thumbnailImage)
    };
    axios.post("/api/events", transformedEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setNewEvent({
          thumbnailImage: '',
          category: '',
          heading: '',
          date: '',
          driveLink: ''
        });
        setIsFormVisible(false);
      })
      .catch(error => {
        console.error("Error adding event:", error);
      });
  };

  const handleDeleteEvent = (eventId) => {
    axios.delete(`/api/events/${eventId}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== eventId));
        setIsDeleteMode(false);
      })
      .catch(error => {
        console.error("Error deleting event:", error);
      });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (password === "123456") {
      setIsEditMode(true);
      setIsEditFormVisible(false);
      setError('')
    } else {
      setError('Invalid Credentials.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Events</h2>
        <div className="add-holiday-btn">
          <button className="adminbtn" onClick={() => setIsEditFormVisible(!isEditFormVisible)}>
            Edit
          </button>
          {isEditFormVisible && (
            <form onSubmit={handleEditSubmit} className="password-form">
              <input
                type="password"
                className="inputField"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="submit" className="adminbtn">Submit</button>
            </form>
          )}
          {error && <p className="event-error">{error}</p>}
          {isEditMode && (
            <>
              <button className="adminbtn" onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? "Cancel" : "Add Event"}
              </button>
              <button className="adminbtn" onClick={() => setIsDeleteMode(!isDeleteMode)}>
                {isDeleteMode ? "Cancel" : "Delete Event"}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="page-layout">
        {isFormVisible && isEditMode && (
          <form onSubmit={handleAddEvent} className="event-form">
            <input type="text" className="inputField" name="driveLink" placeholder="Drive Link" value={newEvent.driveLink} onChange={handleInputChange} required />
            <input type="text" className="inputField" name="thumbnailImage" placeholder="Thumbnail Image URL" value={newEvent.thumbnailImage} onChange={handleInputChange} required />
            <input type="text" className="inputField" name="category" placeholder="Category" value={newEvent.category} onChange={handleInputChange} required />
            <input type="text" className="inputField" name="heading" placeholder="Heading" value={newEvent.heading} onChange={handleInputChange} required />
            <input type="date" className="inputField" name="date" placeholder="Date" value={newEvent.date} onChange={handleInputChange} required />
            <button type="submit" className="adminbtn">Add Event</button>
          </form>
        )}
        <div className="event-card-container">
          {events.map(event => (
            <div key={event.id} className="event-card">
              {isDeleteMode && isEditMode && (
                <button className="adminbtn" onClick={() => handleDeleteEvent(event.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              )}
              <a href={event.driveLink}>
                <div className="event-card-image" style={{ backgroundImage: `url(${event.thumbnailImage})` }}></div>
                <div className="event-card-category">{event.category}</div>
                <div className="event-card-heading">
                  {event.heading}
                  <div className="event-card-date">{new Date(event.date).toUTCString().slice(0, 16)}</div>
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
