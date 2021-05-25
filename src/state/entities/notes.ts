import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'


const fetchNotesByUserId = createAsyncThunk(
  'prospects/fetchProspectsByUserId',
  async (id: number, thunkAPI: any) => {
    setTimeout(() => {
      return console.log(`User ID: ${id}`)
    }, 2000)
  }
)

const NotesSlice = createSlice({
  name: 'Notes',
  initialState: {
    userId: '',
    isLoading: false,
    lastFetch: null,
    notes: []
  },
  reducers: {
    ADD_PROSPECT: (state, { payload }) => {
      state.notes.push(payload)
    },
    DELETE_PROSPECT: (state, { payload }) => {
      state.notes.splice(payload, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotesByUserId.pending, (state, action) => {
      state.isLoading = true
      console.log(`Pending action: ${action.payload}`)
    })
    builder.addCase(fetchNotesByUserId.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(`Fulfilled action: ${action.payload}`)
    })
    builder.addCase(fetchNotesByUserId.rejected, (state, action) => {
      state.isLoading = false
      console.log(`Rejected action: ${action.payload}`)
    })
  }
})

export const { ADD_PROSPECT, DELETE_PROSPECT } = NotesSlice.actions

export const selectProspects = createSelector(
  (state: RootState) => state.entities.notes.notes,
  (notes) => notes
)


export default NotesSlice.reducer