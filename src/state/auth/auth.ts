import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '../configureStore'
import { createSelector } from 'reselect'
import firebase from 'firebase'
import { useAppDispatch } from '../hooks'
import axios from 'axios'


interface AuthError {
  errorCode?: number
  message: string
}

interface AuthState {
  isLoading: Boolean
  isAuthenticated: Boolean
  firstLogin: Boolean
  firstName?: String | null
  username?: String | null
  email?: String | null
  error: AuthError
}

interface LoginCredentials {
  email: string
  password: string
}

interface SignupData {
  firstName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface ThunkAPI {
  dispatch: AppDispatch
  getState: Function
  extra?: any
  requestId: string
  signal: AbortSignal
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  firstLogin: true, 
  firstName: null, 
  username: null, 
  email: null,
  error: {
    errorCode: null,
    message: ''
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI: ThunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const firebase = await thunkAPI.extra.getFirebase()

    // put axios call here
    const token = await axios({
      method: 'POST',
      url: process.env.LOGIN_URL,
      data: {
        email: credentials.email,
        password: credentials.password
      }
    })
    const user = await firebase.auth().signInWithCustomToken(token.data)
    console.log(user)
    
    // const { firstName, username, email } = await firebase.auth().currentUser

    // dispatch(SET_AUTH_USERDATA({
    //   firstName, 
    //   username, 
    //   email
    // }))

    // console.log(`These are credentials: ${JSON.stringify(credentials)}`)
    // console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
  }
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupData: SignupData, thunkAPI: ThunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const firebase = await thunkAPI.extra.getFirebase()
    const firestore = await thunkAPI.extra.getFirestore()
    
    console.log(`This is firestore: ${firestore}`)

    try {
      // put axios call here
      const token = await axios({
        method: 'POST',
        url: process.env.SIGNUP_URL,
        data: {
          firstName: signupData.firstName,
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          confirmPassword: signupData.confirmPassword
        }
      })
      // console.log(token)
      const user = await firebase.auth().signInWithCustomToken(token.data.token)
      console.log(`USER: ${JSON.stringify(user)}`)
     
      
      // const { firstName, username, email } = await firebase.auth().currentUser
      const currentUser = await firebase.auth().currentUser
      console.log(`Current user before update: ${JSON.stringify(currentUser)}`)
  
      await currentUser.updateEmail(signupData.email)
      await currentUser.updateProfile({displayName: signupData.firstName}).then(() => console.log(currentUser))
      localStorage.setItem('session', JSON.stringify(currentUser))
  
      // const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      // console.log(`ID Token: ${idToken}`)
  
      // console.log(`Updated Account: ${updatedAccount}`)
      // dispatch(SET_AUTH_USERDATA({
      //   firstName, 
      //   username, 
      //   email
      // }))
  
      // console.log(`These are credentials: ${JSON.stringify(signupData)}`)
      // console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
    } catch (error) {
      console.log(`Signup thunk error: ${error}`)
    }
  
    
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (param: null, thunkAPI: ThunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const firebase = await thunkAPI.extra.getFirebase()

    dispatch(SET_AUTH_USERDATA({
      firstName: null, 
      username: null, 
      email: null
    }))

    await firebase.auth().signOut()

    console.log(`These are credentials: ${JSON.stringify(param)}`)
    console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_AUTH_USERDATA: (state, { payload }) => {
      state.firstName = payload.firstName
      state.username = payload.username
      state.email = payload.email
    },
    SET_FIRSTLOGIN: (state, { payload }) => {
      state.firstLogin = payload
    },
    SET_AUTHENTICATED: (state, { payload }) => {
      state.isAuthenticated = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      // state.isLoading = true
      console.log(`Pending action: ${action}`)
    })
    builder.addCase(login.fulfilled, (state, action) => {
      // state.isLoading = false
      // state.firstLogin = false
      state.isAuthenticated = true
      console.log(`Fulfilled action: ${action}`)
    })
    builder.addCase(login.rejected, (state, action) => {
      // state.isLoading = false
      console.log(`Rejected action: ${action}`)
    })
    builder.addCase(signup.pending, (state, action) => {
      // state.isLoading = true
      console.log(`Pending action: ${action}`)
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      // state.isLoading = false
      state.isAuthenticated = true
      console.log(`Fulfilled action: ${action}`)
    })
    builder.addCase(signup.rejected, (state, action) => {
      // state.isLoading = false
      console.log(`Rejected action: ${action}`)
    })
    builder.addCase(logout.pending, (state, action) => {
      // state.isLoading = true
      console.log(`Pending action: ${action}`)
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      // state.isLoading = false
      state.isAuthenticated = false
      console.log(`Fulfilled action: ${action}`)
    })
    builder.addCase(logout.rejected, (state, action) => {
      // state.isLoading = false
      console.log(`Rejected action: ${action}`)
    })
  }
})

export const { SET_AUTH_USERDATA, SET_AUTHENTICATED } = authSlice.actions


export const selectFirstName = createSelector(
  (state: RootState) => state.auth.userIdentifiers?.firstName, 
  (firstName) => firstName
)
export const selectUsername = createSelector(
  (state: RootState) => state.auth.userIdentifiers?.username, 
  (username) => username
)

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth.isAuthenticated,
  (isAuthenticated) => isAuthenticated
)

export default authSlice.reducer