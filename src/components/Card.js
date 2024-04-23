import React from 'react'
import './card.css'
import data from '../components/dashdata'

export default function Card(props) {
    
  return (
    <div className='card shadow'>
        <img width='150px' src={props.img} alt='dash-item-image' />
          <p>{props.title}</p>
    </div>
  )
}
