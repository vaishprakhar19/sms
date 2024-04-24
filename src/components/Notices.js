import React from 'react'
import "./notices.css"

const Notices = (props) => {
  return (
    <div className="notices">
    <div className="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className="notititle">{props.notiTitle}</div>
    <div className="notibody">{props.notiBody}</div>
  </div>
  </div>
  )
}

export default Notices