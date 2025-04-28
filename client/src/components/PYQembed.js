import React from "react";
import "./PYQEmbed.css"
const PYQEmbed = ({ folderId }) => {
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;

  return (
    <div className="drive-embed-container">
      <iframe className="iframePYQ"
        src={embedUrl}
        title="Google Drive Folder"
        width="100%"
        height="100%"
        // scrolling="no"
        seamless="seamless"
      ></iframe>
    </div>
  );
};

export default PYQEmbed;
