import { configureStore} from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'
import rootReducer from './rootReducer'
import logger from './middleware/logger'



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        getFirebase,
        getFirestore
      }
    },
    immutableCheck: true,
    serializableCheck: true
  }).concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store