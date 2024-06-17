import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import data from '../components/dashdata';

export default function Card(props) {
  console.log(props.img)
  return (
    <Link to={props.href} className='card-link'>
      <div className='card shadow'>
        <img width='150px' src={props.img} alt='dash-item-image' />
        <p>{props.title}</p>
      </div>
    </Link>
  );
}