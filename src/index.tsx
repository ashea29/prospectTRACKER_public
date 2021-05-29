import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from "redux-firestore"
import store from './state/configureStore'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import firebaseConfig from './state/fbconfig'
import App from './App'


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
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>,
   document.getElementById('root')
)
