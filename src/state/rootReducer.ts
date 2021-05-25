import { combineReducers } from '@reduxjs/toolkit'
import entitiesReducer from './entitiesReducer'
import authReducer from './auth/auth'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'


export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  entities: entitiesReducer
})
