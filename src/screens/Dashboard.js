import React from 'react'
import './dashboard.css';
import Card from '../components/Card';
import dashdata from '../components/dashdata';

function Dashboard() {
  const cards= dashdata.map(item=>{
    return(
      <Card {...item}/>
    )
  })
  return (
    <div className='dashboard'>
      <header>
        <div className='user-profile'>
          <img className='user-profile-image' src='/' alt='profile-image' />
          <p>Username</p>
        </div>
      </header>
      <main>
        <card  className='dash-item-container'>
        {cards}
        </card>
      </main>
    </div>
  )
}

export default Dashboard