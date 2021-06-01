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
import AuthSpinner from './shared/AuthSpinner'
import { useAppSelector } from './state/hooks'



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
  createFirestoreInstance
}

const AuthWrapper = ({ children }) => {
  const auth = useAppSelector(state => state.firebase.auth)
  if (!auth.isLoaded) {
    return (
      <AuthSpinner />
    )
  } else {
    return (
      children
    )
  }  
}


ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <AuthWrapper>
            <App />
          </AuthWrapper>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>,
   document.getElementById('root')
)
