import React from 'react'
import './dashboard.css';
import Card from '../components/Card';
import dashdata from '../components/dashdata';
import {signOut} from "firebase/auth";
import {auth} from '../firebase'
import Notices from '../components/Notices';
import notidata from '../components/notidata';

function Dashboard({user, setUser}) {
  console.log(user);
  const cards= dashdata.map(item=>{
    return(
      <Card {...item}/>
    )
  })

  const handleSignOut = () => {
    signOut(auth)
        .then(result => {
            setUser(null);
            localStorage.clear();
        })
        .catch(error => {
            console.log('error', error.message);
        })
    }

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
          <img className='user-profile-image' src='' alt='profile-image' />
          <p>Username</p>
        </div>
      </header>
      <main>
        <card className='dash-item-container'>
        {cards}
        </card>
      </main>
      <notice>
        {notices}
        </notice>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default Dashboard