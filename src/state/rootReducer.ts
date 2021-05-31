import { combineReducers } from '@reduxjs/toolkit'
import entitiesReducer from './entitiesReducer'
import authReducer from './auth/auth'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'
import { firestoreReducer, FirestoreReducer } from 'redux-firestore'



interface RootReducerTypes {
  firebase: FirebaseReducer.Reducer
  firestore: FirestoreReducer.Reducer
  auth: any
  entities: any
}

export default combineReducers<RootReducerTypes>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  entities: entitiesReducer
})
