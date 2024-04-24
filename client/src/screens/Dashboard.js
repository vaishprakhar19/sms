import React from 'react'
import './dashboard.css';
import Card from '../components/Card';
import dashdata from '../components/dashdata';
import { signOut } from "firebase/auth";
import { auth } from '../firebase'
import Notices from '../components/Notices';
import notidata from '../components/notidata';
import Navbar from '../components/Navbar';



function Dashboard({ user, setUser }) {
  console.log(user);
  const cards = dashdata.map(item => {
    return (
      <Card {...item} />
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
console.log(user)
  const notices = notidata.map(item => {
    return (
      <Notices
        {...item}
      />
    )
  })

  return (
    <div className='dashboard'>
      <header>
        <div className='user-profile'>

          {user ? <img className='user-profile-image' src={user.photoURL} alt='profile' /> : <img src='../../assets/profilepic.jpg' />}
          <p>{user.displayName}</p>
        <button className="Btn" onClick={handleSignOut}>
          <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
          <div className="text">Logout</div>
        </button>
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
      <footer>
        <Navbar/>
      </footer>



    </div>
  )
}

export default Dashboard