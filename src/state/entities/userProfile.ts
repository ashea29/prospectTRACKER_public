import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'
import { createSelector } from 'reselect'



interface ProfileData {
  firstName?: string
  username?: string
  email: string
  userSince?: number
}

interface UserProfileState {
  isLoading: Boolean
  lastFetch?: number | null
  profileData: ProfileData
}

const initialState: UserProfileState = {
  isLoading: false,
  lastFetch: null,
  profileData: {
    firstName: 'Andrew',
    username: 'andrewrocks_514',
    email: '',
    userSince: null
  }
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    DATA_REQUESTED: (state) => {
      state.isLoading = true
    },
    SET_FIRSTNAME: (state, action: PayloadAction<string>) => {
      state.profileData.firstName = action.payload
    },
    SET_USERNAME: (state, action: PayloadAction<string>) => {
      state.profileData.username = action.payload
    },
    SET_EMAIL: (state, action: PayloadAction<string>) => {
      state.profileData.email = action.payload
    },
    SET_USERSINCE: (state, action: PayloadAction<number>) => {
      state.profileData.userSince = action.payload
    },
    SET_PROFILE: (state, { payload }) => {
      state.isLoading = false
      state.lastFetch = Date.now()
      state.profileData = Object.assign({}, state.profileData, payload)
    },
  },
})

export const {
  SET_FIRSTNAME,
  SET_USERNAME,
  SET_EMAIL,
  SET_USERSINCE,
  SET_PROFILE,
} = userProfileSlice.actions

export const selectProfile = createSelector(
  (state: RootState) => state.entities.userProfile.profileData,
  (profileData) => profileData
) 
export const selectFirstName = createSelector(
  (state: RootState) => state.entities.userProfile.profileData.firstName, 
  (firstName) => firstName
)
export const selectUsername = createSelector(
  (state: RootState) => state.entities.userProfile.profileData.username,
  (username) => username
)
export const selectEmail = createSelector(
  (state: RootState) => state.entities.userProfile.profileData.email,
  (email) => email
)
export const selectUserSince = createSelector(
  (state: RootState) => state.entities.userProfile.profileData.userSince,
  (userSince) => userSince
)


export default userProfileSlice.reducer
