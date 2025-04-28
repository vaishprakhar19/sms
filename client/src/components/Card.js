import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import { useAppState } from '../AppStateContext';

export default function Card({ href, img, title, isAdminCard }) {
  const { isAdmin } = useAppState();
  if (isAdminCard && !isAdmin) {
    return null;
  }

  return (
    <Link to={href} className='card-link'>
      <div className='card shadow'>
        <img width='150px' src={img} alt='dash-item-image' />
        <p>{title}</p>
      </div>
    </Link>
  );
}
