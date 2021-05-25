import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'


const fetchTodosByUserId = createAsyncThunk(
  'prospects/fetchProspectsByUserId',
  async (id: number, thunkAPI: any) => {
    setTimeout(() => {
      return console.log(`User ID: ${id}`)
    }, 2000)
  }
)

const TodosSlice = createSlice({
  name: 'Todos',
  initialState: {
    userId: '',
    isLoading: false,
    lastFetch: null,
    todos: []
  },
  reducers: {
    ADD_TODO: (state, { payload }) => {
      state.todos.push(payload)
    },
    DELETE_TODO: (state, { payload }) => {
      state.todos.splice(payload, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosByUserId.pending, (state, action) => {
      state.isLoading = true
      console.log(`Pending action: ${action.payload}`)
    })
    builder.addCase(fetchTodosByUserId.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(`Fulfilled action: ${action.payload}`)
    })
    builder.addCase(fetchTodosByUserId.rejected, (state, action) => {
      state.isLoading = false
      console.log(`Rejected action: ${action.payload}`)
    })
  }
})

export const { ADD_TODO, DELETE_TODO } = TodosSlice.actions

export const selectProspects = createSelector(
  (state: RootState) => state.entities.todos.todos,
  (todos) => todos
)


export default TodosSlice.reducer