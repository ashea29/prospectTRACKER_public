import { configureStore} from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { getFirebase, actionTypes as rrfActionTypes } from 'react-redux-firebase'
import { getFirestore, constants as rfConstants } from 'redux-firestore'
import rootReducer from './rootReducer'
import logger from './middleware/logger'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


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
    serializableCheck: {
        ignoredActions: [
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ['firebase', 'firestore', 'auth', 'auth.error']
      }
  }).concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



export default store