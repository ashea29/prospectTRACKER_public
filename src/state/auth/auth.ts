import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'
import { createSelector } from 'reselect'


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


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SIGNUP: (state, action: PayloadAction<any>) => {
      state.firstLogin = false
      state.isAuthenticated = true
      state.userIdentifiers = action.payload
    },
    LOGIN: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true
      state.userIdentifiers = action.payload
    },
    LOGOUT: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = false
      state.userIdentifiers = undefined
    },
  }
})

export const { LOGIN, LOGOUT, SIGNUP } = authSlice.actions


export const selectFirstName = createSelector(
  (state: RootState) => state.auth.userIdentifiers?.firstName, 
  (firstName) => firstName
)
export const selectUsername = createSelector(
  (state: RootState) => state.auth.userIdentifiers?.username, 
  (username) => username
)

export default authSlice.reducer