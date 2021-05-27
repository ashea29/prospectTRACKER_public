import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'
import { createSelector } from 'reselect'
import firebase from 'firebase'


interface AuthError {
  message: string
}

interface AuthState {
  isLoading: Boolean
  isAuthenticated: Boolean
  firstLogin: Boolean
  userIdentifiers?: { 
    firstName: String
    username: String
  },
  error: AuthError
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  firstLogin: true,
  userIdentifiers: { 
    firstName: '', 
    username: '' 
  },
  error: {
    message: ''
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: object, thunkAPI: any) => {
    const firebase = await thunkAPI.extra.getFirebase()
    console.log(`These are credentials: ${JSON.stringify(credentials)}`)
    console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
  }
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupData: object, thunkAPI: any) => {
    const firebase = await thunkAPI.extra.getFirebase()
    console.log(`These are credentials: ${JSON.stringify(signupData)}`)
    console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (param: null, thunkAPI: any) => {
    const firebase = await thunkAPI.extra.getFirebase()
    console.log(`These are credentials: ${JSON.stringify(param)}`)
    console.log(`This is Firebase: ${JSON.stringify(firebase.auth())}`)
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true
      console.log(`Pending action: ${action}`)
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(`Fulfilled action: ${action}`)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      console.log(`Rejected action: ${action}`)
    })
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true
      console.log(`Pending action: ${action}`)
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(`Fulfilled action: ${action}`)
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false
      console.log(`Rejected action: ${action}`)
    })
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true
      console.log(`Pending action: ${action}`)
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(`Fulfilled action: ${action}`)
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false
      console.log(`Rejected action: ${action}`)
    })
  }
})

// export const { LOGIN, LOGOUT, SIGNUP } = authSlice.actions


export const selectFirstName = createSelector(
  (state: RootState) => state.auth.userIdentifiers?.firstName, 
  (firstName) => firstName
)
export const selectUsername = createSelector(
  (state: RootState) => state.auth.userIdentifiers?.username, 
  (username) => username
)

export default authSlice.reducer