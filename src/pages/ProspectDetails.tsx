import React from 'react'
import { useParams } from 'react-router-dom'
import construction from '../assets/images/construction.svg'

import './ProspectDetails.css'

interface RouteParams {
  companyName: string
}

interface ProspectProps {
  companyName: string
  address: string
  coordinates: { 
    lat: number, 
    lng: number 
  }
  website: string
  jobAppliedFor: string
  contactPerson: string
  email: string
}

const ProspectDetails: React.FC = () => {
  const params = useParams<RouteParams>()
  
  return (
    <div className='prospect-container'>
       <div className="image_container">
         <img src={construction} className="construction-img" alt="Under Construction" />
       </div>
    </div>
  )
}

export default ProspectDetails
