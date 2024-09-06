import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Showresult = () => {
  
      const { resultId } = useParams();  // Get resultId from the URL
      const [studentData, setStudentData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const totalMaxMarks = studentData.marks.length * 15;

      useEffect(() => {
        const fetchResult = async () => {
          try {
            const response = await axios.get(`https://biasportalback.vercel.app/result/getResult/${resultId}`);
            setStudentData(response.data);
            console.log(response.data);
            setLoading(false);
          } catch (err) {
            setError("Failed to fetch data");
            setLoading(false);
          }
        };
    
        fetchResult();
      }, [resultId]);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;
    
      return (
        <>
        <div className='page-header'>
          <h3>Result for {studentData.student.name}</h3>
          <p><strong>Roll Number:</strong> {studentData.student.roll_no}</p>
          <p><strong>Batch:</strong> {studentData.student.batch}</p>
    
                </div>
            <div className='page-layout'>
          <p><strong>Internal Exam:</strong> {studentData.internal_exam}</p>
          <div className='table-container'>
                
            
          <table className='table'>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Max</th>

              </tr>
            </thead>
            <tbody>
              {studentData.marks.map((subject, index) => (
                  <tr key={index}>
                  <td>{subject.name}</td>
                  <td>{subject.marks}</td>
                  <td>15</td>
                </tr>
              
              ))}
              <tr>
              <td><strong>Total Marks:</strong></td>
              <td>{studentData.total_marks}</td>
              <td>{totalMaxMarks}</td>
              </tr>
            </tbody>
          </table>
              </div>
              </div>
        
              </>
     

    
  )
}

export default Showresult;