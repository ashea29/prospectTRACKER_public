import React from 'react'
import * as yup from 'yup'
import NewProspectForm from '../components/NewProspectForm'

import './NewProspect.css'


const NewProspectSchema = yup.object().shape({
  companyName: yup.string()
    .required('Company name is required'),
  address: yup.string()
    .required('Address is required'),
  website: yup.string()
    .min(7, 'Website must be at least 7 characters long')
    .required('Password is required'),
  jobTitle: yup.string()
    .required('Job title is required'),
  contactPerson: yup.string(),
  email: yup.string()
    .required('Email is required')
})

const NewProspect: React.FC = () => {
  return (
    <div className='newprospect-container'>
      <div className="newprospect-card">
        <NewProspectForm schema={NewProspectSchema}/>
      </div>
    </div>
  )
}

export default NewProspect
