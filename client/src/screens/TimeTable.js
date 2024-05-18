import React ,{useEffect,useState}from 'react'
import "./Timetable.css"
import axios from 'axios';
import { useAppState } from '../AppStateContext';
const TimeTable = () => {
  const {
    user
  } = useAppState();
  const uid=user.uid;
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    // Fetch timetable data from backend when component mounts
    axios.get(`/timetable/${uid}`)
      .then(response => {
        setTimetable(response.data);
      })
      .catch(error => {
        console.error('Error fetching timetable:', error);
      });
  }, [uid]); 
  console.log(timetable)
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
            <th> mon</th>
            <th> tue</th>
            <th> wed</th>
            <th> thurs</th>
            <th> fri</th>
            <th> Sat</th>
          </tr>
          <tbody>
          {timetable.map((entry, index) => (
            <tr key={index}>
              <td>{entry.DayOfWeek}</td>
              <td>{entry.StartTime}</td>
              <td>{entry.EndTime}</td>
              <td>{entry.SubjectName}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default TimeTable