import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from "redux-firestore"
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from './state/configureStore'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import firebaseConfig from './state/fbconfig'
import App from './App'
import LoadingSpinner from './shared/LoadingSpinner'


const persistor = persistStore(store)

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  oneListenerPerPath: true
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()


const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}


ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>,
   document.getElementById('root')
)
