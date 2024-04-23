import React from 'react'
import './dashboard.css';
import Card from '../components/Card';
import dashdata from '../components/dashdata';
import Notices from '../components/Notices';
import notidata from '../components/notidata';

function Dashboard() {
  const cards= dashdata.map(item=>{
    return(
      <Card {...item}/>
    )
  })
  const notices = notidata.map(item=>{
    return(
      <Notices
      {...item}
      />
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
      <notice>
        {notices}
        </notice>
    </div>
  )
}

export default Dashboard