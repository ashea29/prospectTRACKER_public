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
  error: string
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
  error: null
}


// THUNKS
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI: ThunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const firebase = await thunkAPI.extra.getFirebase()
    const firestore = await thunkAPI.extra.getFirestore()

    try {
      const response = await axios({
        method: 'POST',
        url: process.env.LOGIN_URL,
        data: {
          email: credentials.email,
          password: credentials.password
        }
      })

      console.log(response)

      if (response.data.code === 422) {
        dispatch(SET_AUTH_ERROR('Login error occurred'))
      } else {
        const user = await firebase.auth().signInWithCustomToken(response.data.token)
        console.log(user)
      }
     
  
      // dispatch(SET_AUTH_USERDATA({
      //   firstName, 
      //   username, 
      //   email
      // }))
  
      // console.log(`These are credentials: ${JSON.stringify(credentials)}`)
      // console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
    } catch (error) {
        dispatch(SET_AUTH_ERROR(error.message))
    }
    
  }
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupData: SignupData, thunkAPI: ThunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const state = thunkAPI.getState()
    const firebase = await thunkAPI.extra.getFirebase()

    try {
      const response = await axios({
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
      /*const user = */
      console.log(response)

      if (response.data.code) {
        dispatch(SET_AUTH_ERROR('Sorry... something went wrong! Please try again.'))
        // throw new Error('Sorry... something went wrong! Please try again.')
        return
      } else {
        const user = await firebase.auth().signInWithCustomToken(response.data.token)
        console.log(user)

        const currentUser = await firebase.auth().currentUser
        await currentUser.updateEmail(signupData.email)
        await currentUser.updateProfile({displayName: signupData.username})
      }
      // if (!state.auth.error) {
        // await firebase.auth().signInWithCustomToken(token.data.token)
        // // console.log(`USER: ${JSON.stringify(user)}`)
        // const currentUser = await firebase.auth().currentUser
        // // console.log(`Current user before update: ${JSON.stringify(currentUser)}`)
        // await currentUser.updateEmail(signupData.email)
        // await currentUser.updateProfile({displayName: signupData.username})
          // .then(() => console.log(currentUser))
        // localStorage.setItem('session', JSON.stringify(currentUser))
    
        // dispatch(SET_AUTH_USERDATA({
        //   firstName, 
        //   username, 
        //   email
        // }))
    
        // console.log(`These are credentials: ${JSON.stringify(signupData)}`)
        // console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
      } catch (error) {
        console.log(`From signup thunk catch: ${error}`)
        //  dispatch(SET_AUTH_ERROR(error.message))
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
    SET_AUTH_ERROR: (state, { payload }) => {
      state.error = payload
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

export const { SET_AUTH_USERDATA, SET_AUTHENTICATED, SET_AUTH_ERROR, SET_FIRSTLOGIN } = authSlice.actions


export const selectAuthUserData = createSelector(
  (state: RootState) => state.auth, 
  (userdata) => userdata
)

export const selectFirstName = createSelector(
  (state: RootState) => state.auth.firstName, 
  (firstName) => firstName
)

export const selectUsername = createSelector(
  (state: RootState) => state.auth.username, 
  (username) => username
)

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth.isAuthenticated,
  (isAuthenticated) => isAuthenticated
)

export const selectAuthError = createSelector(
  (state: RootState) => state.auth.error,
  (error) => error
)


export default authSlice.reducer