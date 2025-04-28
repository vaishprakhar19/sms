import React, { useState } from "react";

import SyllabusEmbed from "../components/Syllabusembed";
import "./syllabus.css";
import { Link } from "react-router-dom";
import BackHandler from "../components/BackHandler";
import Navbar from "../components/Navbar";

const Syllabus = ({fileId}) => {
  BackHandler();
  const [selectedfile, setSelectedfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingfileId, setLoadingfileId] = useState("");

  const handlefileChange = (e) => {
    const fileId = e.target.value;
    setSelectedfile("");
    setIsLoading(true);
    setLoadingfileId(fileId);

    // Simulate API call or delay (Replace with actual API call)
    setTimeout(() => {
      setSelectedfile(fileId);
      setIsLoading(false);
    }, 1000); // Adjust delay time as needed
  };

  const fileOptions = [
    { id: "1mqX-jL8w-lrPFqnb2wwesUEjt2o6omRe", name: "MCA New" },
    { id: "1mqX-jL8w-lrPFqnb2wwesUEjt2o6omR", name: "MCA Old" },
    { id: "1mqX-jL8w-lrPFqnb2wwesUEjt2o6oRe", name: "BTech CSE New" },
    { id: "1mqX-jL8w-lrPFqnb2wwesUEjt2o6odsmRe", name: "BTech CSE Old" },
    { id: "1mqX-jL8w-lrPFqnb2wwesEjt2omRe", name: "BTech ECE Old" },
    { id: "1mqX-jL8w-lrPFqnb2wwesUEjt2omRe", name: "BTech CSE New" },

  ];

  return (
    <div className="pyq">
      <div className="page-header">
        <Link to="/dashboard">
      <h2>Select a file to view:</h2>
        </Link>
        </div>
        <div className="page-layout">
      <div className="radio-inputs radio-pyq">
        {fileOptions.map((file) => (
          <label key={file.id} className="radio">
            <input
              type="radio"
              name="file"
              value={file.id}
              checked={selectedfile === file.id}
              onChange={handlefileChange}
            />
            <span className="name radio-in-pyq">{file.name}</span>
          </label>
        ))}
      </div>

      {isLoading && loadingfileId && (
        <div className="loader2"><div className="loaderin"></div></div>
      )}
      {selectedfile && !isLoading && (
        <SyllabusEmbed fileId={selectedfile} />
      )}
      </div>
      <Navbar></Navbar>
    </div>
  );
};
export default Syllabus;








// import React, { useState, useEffect } from 'react';
// import "./syllabus.css"
// import { Link } from "react-router-dom";
// import syllabusData from '../components/syllabusData.json'
// const Syllabus = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const handleSearch = () => {
//     if (!query) {
//       setResults([]); // Empty results if query is empty
//     } else {
//       // Filter syllabus data based on partial match of subject name
//       const filteredResults = syllabusData.filter(semester =>
//         semester.subjects.some(subject =>
//           subject.name.toLowerCase().includes(query.toLowerCase())
//         )
//       ).map(semester => ({
//         ...semester,
//         subjects: semester.subjects.filter(subject =>
//           subject.name.toLowerCase().includes(query.toLowerCase())
//         )
//       })).filter(semester => semester.subjects.length > 0);

//       setResults(filteredResults);
//     }
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [query]);

//   return (
//     <div>
//       <div className='page-header'>
//       <Link to="/dashboard">
//         <h2>Syllabus Viewer</h2>
//         </Link>
//       </div>
//       <div className='page-layout syllabus'>

//         <input
//           type="text"
//           className='inputField syllabusIn'
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search by subject name..."
//         />
//         {results.map(semester => (
//           <div className='syllabusView' key={semester.semester}>
//             <h1>{semester.semester}</h1>
//             {semester.subjects.map(subject => (
//               <div  key={subject.code}>
//                 <h3>{subject.name} ({subject.code})</h3>
//                 {subject.units.map(unit => (
//                   <div key={unit.name}>
//                     <h4>{unit.name}</h4>
//                     <div>{unit.topics}</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Syllabus;