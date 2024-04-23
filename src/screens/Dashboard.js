import React from 'react'
import './dashboard.css';

function Dashboard() {
  return (
    <div className='dashboard'>
      <header>
        <div className='user-profile'>
          <img className='user-profile-image' src='/' alt='profile-image' />
          <p>Username</p>
        </div>
      </header>
      <main className='dash-item-container'>
        <div className='dash-item'>
          <img src='/' alt='dash-item-image' />
          <p>Dashboard Item</p>
        </div>
        <div className='dash-item'>
          <img src='/' alt='dash-item-image' />
          <p>Dashboard Item</p>
        </div>
        <div className='dash-item'>
          <img src='/' alt='dash-item-image' />
          <p>Dashboard Item</p>
        </div>
        <div className='dash-item'>
          <img src='/' alt='dash-item-image' />
          <p>Dashboard Item</p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard