import React from 'react'
import Card from '../components/Card';
import dashdata from '../components/dashdata';
import Notices from '../components/Notices';
import notidata from '../components/notidata';
import './loader.css';


const Loader = () => {
    const cards = dashdata.map(item => {
        return (
            <Card/>
        )
    })

    const notices = notidata.map(item => {
        return (
            <Notices/>
        )
    })
    return (
        <div className='dashboard'>
            <header>
                <div className='Loader-user-profile'>
                    <img className='Loader-user-profile-image' src="" alt='profile' />
                    <p>User</p>
                    <button className="Loader-Logout-Btn">H</button>
                </div>
            </header>
            <main>
                <card className='Loader-dash-item-container'>
                    {cards}
                </card>
            </main>
            <notice>
                {notices}
            </notice>
        </div>
    )
}

export default Loader