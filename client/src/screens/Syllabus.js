import React, { useState, useEffect } from 'react';
import "./syllabus.css"

import syllabusData from '../components/syllabusData.json'
const Syllabus = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = () => {
    if (!query) {
      setResults([]); // Empty results if query is empty
    } else {
      // Filter syllabus data based on partial match of subject name
      const filteredResults = syllabusData.filter(semester =>
        semester.subjects.some(subject =>
          subject.name.toLowerCase().includes(query.toLowerCase())
        )
      ).map(semester => ({
        ...semester,
        subjects: semester.subjects.filter(subject =>
          subject.name.toLowerCase().includes(query.toLowerCase())
        )
      })).filter(semester => semester.subjects.length > 0);

      setResults(filteredResults);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div>
      <div className='page-header'>
        <h2>Syllabus Viewer</h2>
      </div>
      <div className='page-layout syllabus'>

        <input
          type="text"
          className='inputField syllabusIn'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by subject name..."
        />
        {results.map(semester => (
          <div className='syllabusView' key={semester.semester}>
            <h2>{semester.semester}</h2>
            {semester.subjects.map(subject => (
              <div  key={subject.code}>
                <h3>{subject.name} ({subject.code})</h3>
                {subject.units.map(unit => (
                  <div key={unit.name}>
                    <h4>{unit.name}</h4>
                    <div>{unit.topics}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;