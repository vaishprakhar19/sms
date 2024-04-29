import React from 'react'
import "./loader.css"

const Loader = ({loading}) => {
  return (<>
    {loading?
      <div className='dashboard loaderpos'>
      <header>
        <div className='user-profile loader-prof'>
        <img className='user-profile-image loader-img loader'alt='' /> 

        </div>
      </header>
      <main>
      <div className='dash-item-container '>
      <div className='card-link laoder'>
      <div className='card shadow loader'>
        <img width='150px' alt='' />
        <p></p>
      </div>
    </div>
      <div className='card-link'>
      <div className='card shadow loader'>
        <img className='loader-img' width='150px' alt='' />
        <p></p>
      </div>
    </div>
      <div className='card-link'>
      <div className='card shadow loader'>
        <img width='150px' alt='' />
        <p></p>
      </div>
    </div>
      <div className='card-link'>
      <div className='card shadow loader'>
        <img width='150px' alt='' />
        <p></p>
      </div>
    </div>
      <div className='card-link'>
      <div className='card shadow loader'>
        <img width='150px' alt='' />
        <p></p>
      </div>
    </div>
      <div className='card-link'>
      <div className='card shadow loader'>
        <img width='150px' alt='' />
        <p></p>
      </div>
    </div>
    </div>
      </main>
      <div className="notices">
    <div className="notification loader-noti loader">
    <div className="notiglow loader"></div>
    <div className="notiborderglow loader"></div>
    <div className="notititle "></div>
    <div className="notibody loader"></div>
  </div>
  </div>
      <div className="notices">
    <div className="notification loader-noti">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className="notititle"></div>
    <div className="notibody"></div>
  </div>
  </div>


    </div>
    :<>
    
    </>
    }
  </>
  )
}

export default Loader