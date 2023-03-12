import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Notfound = () => {
  return (
    <div className='not-found'>
        <div className='nar-bar'>
            <Link to="/login">
                
                  <button className='button'>Login</button>
            </Link>
              <Link to="/signup">
                  <button className='button'>Signup</button>
              </Link>
        </div>
          <img src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png" alt="notfound" className='not-found-image' />
    </div>
  )
}

export default Notfound