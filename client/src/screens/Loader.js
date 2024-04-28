import React from 'react'
import "./loader.css"

const Loader = ({loading}) => {
  return (<>
    {loading?
    <div className='loader'>
      
    </div>
    :<>
    </>
    }
  </>
  )
}

export default Loader