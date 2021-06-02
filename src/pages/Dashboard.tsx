import React from 'react'
import construction from '../assets/images/construction.svg'

import './Dashboard.css'


const Dashboard: React.FC = () => {
  return (
    <div className='prospect-container'>
      <h1 className='construction-text'>THIS AREA CURRENTLY UNDER CONSTRUCTION</h1>
      <div className="image_container">
        <img src={construction} className="construction-img" alt="Under Construction" />
      </div>
    </div>
  )
}

export default Dashboard
