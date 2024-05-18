import React, { useEffect, useState } from 'react'
import "./Timetable.css"
const TimeTable = () => {
    const [timetableData, setTimetableData] = useState([]);

    useEffect(() => {
      // Fetch timetable data from the backend API
      fetch('/api/timetable')
        .then((response) => response.json())
        .then((data) => setTimetableData(data))
        .catch((error) => console.error('Error fetching timetable data:', error));
    }, []);


    return (
      <div>
        <div className='page-header'>
          <h2>Time Table</h2>
        </div>
        <div className='page-layout'>
          <table className='table'>
            <tr>
              <th colspan="8">timetable</th>
            </tr>
            <tr>
              <th rowspan="8">hours</th>
              <th>mon</th>
              <th>tue</th>
              <th>wed</th>
              <th>thurs</th>
              <th>fri</th>
              <th>Sat</th>
            </tr>
            <tr>
              <td>science</td>
              <td>maths</td>
              <td>science</td>
              <td>maths</td>
              <td>arts</td>
              <td>arts</td>
            </tr>
            <tr>
              <td>science</td>
              <td>maths</td>
              <td>science</td>
              <td>maths</td>
              <td>arts</td>
              <td>arts</td>
            </tr>
            <tr>
              <td>science</td>
              <td>maths</td>
              <td>science</td>
              <td>maths</td>
              <td>arts</td>
              <td>arts</td>
            </tr>
            <tr>
              <td>social</td>
              <td>hindi</td>
              <td>english</td>
              <td>social</td>
              <td>sports</td>
              <td>sports</td>
            </tr>
            <tr>
              <th colspan="6">lunch</th>
            </tr>
            <tr>
              <td>science</td>
              <td>maths</td>
              <td>science</td>
              <td>maths</td>
              <td rowspan="1">project</td>
            </tr>
            <tr>
              <td>social</td>
              <td>hindi</td>
              <td>english</td>
              <td>social</td>
              <td>social</td>
            </tr>
          </table>
          {/* <table className='table'>
        {timetableData.map((row, index) => (
          <tr key={index}>
            <td>{row.mon}</td>
            <td>{row.tue}</td>
            <td>{row.wed}</td>
            <td>{row.thu}</td>
            <td>{row.fri}</td>
            <td>{row.sat}</td>
          </tr>
        ))}
      </table> */}
        </div>
      </div>
    )
  }

  export default TimeTable
