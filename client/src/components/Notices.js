import React from 'react'
import axios from 'axios';
import "./notices.css"
import { useAppState } from '../AppStateContext';

const Notices = ({ notices,onDeleteNotice }) => {
  const handleDelete = async (id) => {
    try {
      console.log('Deleting notice with ID:', id);
      await axios.delete(`/api/notices/${id}`);
      onDeleteNotice(id);
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };
const {isAdmin} = useAppState()
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
          {isAdmin&&<button className='adminbtn' onClick={() => handleDelete(notice.id)}>Delete</button>}
        </div>
        </div>
      ))}
  </div>
  )
}

export default Notices  