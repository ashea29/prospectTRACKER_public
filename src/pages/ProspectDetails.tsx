import React from 'react'
import { useParams } from 'react-router-dom'

interface RouteParams {
  companyName: string
}

const ProspectDetails = () => {
  const params = useParams<RouteParams>()
  
  return (
    <div>
      <h1>Prospect Details</h1>
    </div>
  )
}

export default ProspectDetails
