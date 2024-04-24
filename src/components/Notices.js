import React from 'react'
import "./notices.css"

const Notices = (props) => {
  return (
    <div className="notices">
    <div class="notification">
    <div class="notiglow"></div>
    <div class="notiborderglow"></div>
    <div class="notititle">{props.notiTitle}</div>
    <div class="notibody">{props.notiBody}</div>
  </div>
  </div>
  )
}

export default Notices