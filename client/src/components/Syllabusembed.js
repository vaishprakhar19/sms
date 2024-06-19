import React from 'react'
import "./PYQEmbed.css"
const Syllabusembed = ({ fileId }) => {
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="drive-embed-container">
    <iframe className='iframeSyllabus'
      src={embedUrl}
      title="Google Drive"
      // width="100%"
      // height="100%"
      allow="autoplay"
      seamless="seamless"
    ></iframe>
  </div>
  )
};

export default Syllabusembed