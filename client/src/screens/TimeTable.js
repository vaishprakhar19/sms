import React from 'react'
import "./Timetable.css"
const TimeTable = () => {
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
      </div>
    </div>
  )
}

export default TimeTable