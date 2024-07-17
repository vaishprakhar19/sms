import React, { useState } from "react";
import PYQEmbed from "../components/PYQembed";
import "./PYQ.css";
import { Link } from "react-router-dom"
import BackHandler from "../components/BackHandler";


const PYQ = () => {
  BackHandler();
  const [selectedFolder, setSelectedFolder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFolderId, setLoadingFolderId] = useState("");

  const handleFolderChange = (e) => {
    const folderId = e.target.value;
    setSelectedFolder("");
    setIsLoading(true);
    setLoadingFolderId(folderId);

    // Simulate API call or delay (Replace with actual API call)
    setTimeout(() => {
      setSelectedFolder(folderId);
      setIsLoading(false);
    }, 1000); // Adjust delay time as needed
  };

  const folderOptions = [
    { id: "19ZvAX-DFfiUU6QhhT9MV1vWxup4-dBGK", name: "MCA I & II Year" },
    { id: "1G7jK1g86mjKc6FcheMbBdt0EtTjpGLjv", name: "BTech First Year" },
    { id: "1_SR-YoaDLyWCuzUmKWJEwN1EDBgMS-jy", name: "BTech II Year CSE" },
    { id: "1gwwnSh5NUCVz-L9T1Q6ueZg23U6R9uy9", name: "BTech II Year ECE" },
    { id: "1gw_Ws4OuhrmYRdott8eIikXYEvaqL5xR", name: "BTech III year CSE" },
    { id: "1_wtOeTtmaw6sEJtyCl24Yql5FKC9aIPU", name: "BTech III year ECE" },
    { id: "1fx-cV2MoRLOvWFT3mkC5eXNrIfJX7UJ7", name: "BTech IV Year CSE  " },
    { id: "10mGEWem25LD9WmarJOULVDYU5gwGeuOg", name: "BTech IV Year ECE  " },
  ];

  return (
    <div className="pyq">
      <div className="page-header">
        <Link to="/dashboard">
      <h2>Select a folder to view:</h2>
        </Link>
        </div>
        <div className="page-layout">
      <div className="radio-pyq radio-inputs">
        {folderOptions.map((folder) => (
          <label key={folder.id} className="radio">
            <input
              type="radio"
              name="folder"
              value={folder.id}
              checked={selectedFolder === folder.id}
              onChange={handleFolderChange}
            />
            <span className="name radio-in-pyq">{folder.name}</span>
          </label>
        ))}
      </div>

      {isLoading && loadingFolderId && (
        <div className="loader2"><div className="loaderin"></div></div>
      )}
      {selectedFolder && !isLoading && (
        <PYQEmbed folderId={selectedFolder} />
      )}
      </div>
    </div>
  );
};

export default PYQ;
