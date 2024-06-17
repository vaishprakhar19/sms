import React from 'react'
import axios from 'axios';
import "./notices.css"
import { useAppState } from '../AppStateContext';

const Notices = ({ notices, onDeleteNotice }) => {
  const handleDelete = async (id) => {
    try {
      console.log('Deleting notice with ID:', id);
      await axios.delete(`/api/notices/${id}`);
      onDeleteNotice(id);
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };
  const { isAdmin } = useAppState()
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
              <div className="notibody right">{notice.stream} {notice.semester}{notice.semester === 1 ? "st" : notice.semester === 2 ? "nd" : notice.semester === 3 ? "rd" : "th"} semester</div>
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