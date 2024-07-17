import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import "./notices.css";
import { useAppState } from '../AppStateContext';

const Notices = ({ onDeleteNotice, notices }) => {
  const { isAdmin } = useAppState();
  const [shownNotifications, setShownNotifications] = useState([]);

  useEffect(() => {
    const socket = io(); // Replace with your WebSocket server URL

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newNotice', (newNotice) => {
      if (!shownNotifications.includes(newNotice.id)) {
        showNotification("New Notice Added", {
          body: `${newNotice.title}`,
        });
        setShownNotifications(prev => [...prev, newNotice.id]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [shownNotifications]);

  // Function to handle delete notice
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notices/${id}`);
      onDeleteNotice(id);
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  // Function to show a notification
  const showNotification = (title, options) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    }
  };

  return (
    <div className="notices">
      <h2>Notices</h2>
      {notices.map(notice => (
        <div key={notice.id}>
          <div className="notification">
            <div className="notiglow"></div>
            <div className="notiborderglow"></div>
            <div className="notititle">{notice.title}</div>
            <div className="notibody">{notice.body}</div>

            {isAdmin && <>
              <div className="right">{notice.stream} {notice.semester}{notice.semester === null? "ALL":notice.semester === 1 ? "st" : notice.semester === 2 ? "nd" : notice.semester === 3 ? "rd" : "th"} semester</div>
              <button className='adminbtn' onClick={() => handleDelete(notice.id)}>
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
            </>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notices  