import { combineReducers } from '@reduxjs/toolkit'
import userProfileReducer from './entities/userProfile'
import prospectsReducer from './entities/prospects'
import notesReducer from './entities/notes'
import todosReducer from './entities/todos'


export default combineReducers({
  userProfile: userProfileReducer,
  prospects: prospectsReducer,
  notes: notesReducer,
  todos: todosReducer
})