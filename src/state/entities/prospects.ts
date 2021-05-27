import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'


export const fetchProspectsByUserId = createAsyncThunk(
  'prospects/fetchProspectsByUserId',
  async (id: number, thunkAPI: any) => {
    setTimeout(() => {
      return console.log(`User ID: ${id}`)
    }, 2000)
  }
)

const ProspectsSlice = createSlice({
  name: 'Prospects',
  initialState: {
    userId: '',
    isLoading: false,
    lastFetch: null,
    prospects: []
  },
  reducers: {
    ADD_PROSPECT: (state, { payload }) => {
      state.prospects.push(payload)
    },
    DELETE_PROSPECT: (state, { payload }) => {
      state.prospects.splice(payload, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProspectsByUserId.pending, (state, action) => {
      state.isLoading = true
      console.log(`Pending action: ${action.payload}`)
    })
    builder.addCase(fetchProspectsByUserId.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(`Fulfilled action: ${action.payload}`)
    })
    builder.addCase(fetchProspectsByUserId.rejected, (state, action) => {
      state.isLoading = false
      console.log(`Rejected action: ${action.payload}`)
    })
  }
})

export const { ADD_PROSPECT, DELETE_PROSPECT } = ProspectsSlice.actions

export const selectProspects = createSelector(
  (state: RootState) => state.entities.prospects.prospects,
  (prospects) => prospects
)


export default ProspectsSlice.reducer