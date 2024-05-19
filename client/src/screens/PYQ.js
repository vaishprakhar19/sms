import React, { useState } from 'react'



const pdfLinks = {
  'Computer Science': {
    'Semester1': 'https://drive.google.com/file/d/10ZWKswUOX_M1rZ4x-dQbl42_3kEzrydx/preview',
    'Semester2': 'https://drive.google.com/file/d/0B0YWvNk0oCtqT3l4SkN0R2dUWjg/preview',
  },
  'Mechanical Engineering': {
    'Semester1': 'https://drive.google.com/file/d/0B0YWvNk0oCtqT3l4SkN0R2dUWjg/preview',
    'Semester2': 'https://drive.google.com/file/d/0B0YWvNk0oCtqT3l4SkN0R2dUWjg/preview',
  },
};

const PYQ = () => {

  const [stream, setStream] = useState('Computer Science');
  const [semester, setSemester] = useState('Semester1');
  return (
    <div>
    <select onChange={(e) => setStream(e.target.value)}>
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
    </select>
    <iframe src={pdfLinks[stream][semester]} width="100%" height="500px"></iframe>
  </div>
  )
}

export default PYQ