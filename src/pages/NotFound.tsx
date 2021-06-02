import React from 'react'
import notFound from '../assets/images/notFound.svg'

import './NotFound.css'

const NotFound: React.FC = () => {
  return (
    <div className='not-found-container'>
      <div className="img-container">
        <img src={notFound} className="not-found-img" alt="404 Not Found" />
      </div>
    </div>
  )
}

export default NotFound
