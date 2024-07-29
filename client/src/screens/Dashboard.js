import React, { useEffect } from 'react';
import './dashboard.css';
import Card from '../components/Card';
import dashdata from '../components/dashdata';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import Notice from './Notice';
import { useAppState } from '../AppStateContext';

const adminIcon = process.env.PUBLIC_URL + 'assets/adminIcon.svg';

function Dashboard() {
  const { user, isAdmin } = useAppState();

  const cards = dashdata.map((item) => (
    <Card key={item.id} {...item} />
  ));

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Signed out
      })
      .catch((error) => {
        console.error('Sign out error', error.message);
      });
  };

  return (
    <div className='dashboard'>
      <header>
        <div className='user-profile page-header'>
          {user.photoURL ? (
            <img className='user-profile-image' src={user.photoURL} alt='profile' />
          ) : (
            <img className='user-profile-image' src={adminIcon} alt='profile' />
          )}
          <div className='name'>
            <h4>{isAdmin ? 'ADMIN' : user.displayName || 'STUDENT'}</h4>
          </div>
          <button className='Logout-Btn' onClick={handleSignOut}>
            <div className='sign'>
              <svg viewBox='0 0 512 512'>
                <path d='M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z'></path>
              </svg>
            </div>
            <div className='text'>Logout</div>
          </button>
        </div>
      </header>
      <main>
        <div className='page-layout'>
          <div className='dash-item-container'>{cards}</div>
          <Notice />
        </div>
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default Dashboard;
