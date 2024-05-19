import React, { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";

const pdfLinks = {
  1: {
    1:
      "https://drive.google.com/file/d/10ZWKswUOX_M1rZ4x-dQbl42_3kEzrydx/preview",
    2:
      "https://drive.google.com/file/d/0B0YWvNk0oCtqT3l4SkN0R2dUWjg/preview",
  },
  2: {
    1:
      "https://drive.google.com/file/d/0B0YWvNk0oCtqT3l4SkN0R2dUWjg/preview",
    2:
      "https://drive.google.com/file/d/0B0YWvNk0oCtqT3l4SkN0R2dUWjg/preview",
  },
};
const PYQ = () => {
  const { user } = useAppState();

  const [stream, setStream] = useState(0);
  const [semester, setSemester] = useState(0);
  const uid = user.uid;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/pyq/${uid}`);
        const data = await response.json();
        // console.log(data)
        setStream(data.streamId);
        setSemester(data.currentSemester);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserDetails();
  }, [uid,semester,stream]);
console.log(semester,stream)
  return (
    <div>
      {/* <select onChange={(e) => setStream(e.target.value)}>
        {Object.keys(pdfLinks).map((stream) => (
          <option key={stream} value={stream}>
            {stream}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSemester(e.target.value)}>
        {Object.keys(pdfLinks[stream]).map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select> */}
      {(stream && semester) && <iframe
        src={pdfLinks[stream][semester]}
        width="100%"
        height="500px"
      ></iframe>}
    </div>
  );
};

export default PYQ;
