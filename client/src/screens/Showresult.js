import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Showresult = () => {
  const { resultId } = useParams();  // Get resultId from the URL
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef();

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

  const totalMaxMarks = studentData.marks.length * 15;

  // Function to download the table as PDF
  const downloadPDF = () => {
    const input = tableRef.current;  // Reference to the table
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${studentData.student.name}_result.pdf`);
    });
  };

  return (
    <>
      <div className='page-header'>
        <h3>Birla Institute of Applied Sciences</h3>
      </div>
      
      <div className='page-layout' ref={tableRef}>
        <div className='table-container'>
          <h3>Name: {studentData.student.name}</h3>
          <p><strong>Roll Number:</strong> {studentData.student.roll_no}</p>
          <p><strong>Batch:</strong> {studentData.student.batch}</p>
          <p><strong>Internal Exam:</strong> {studentData.internal_exam}</p>
          
          <table className='table'>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Obtained Marks</th>
                <th>Max Marks</th>
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

      <div className='pdf-button'>
        <button className='adminbtn' onClick={downloadPDF}>Download as PDF</button>
      </div>
    </>
  );
};

export default Showresult;
