import { combineReducers } from 'redux'
import authReducer from './authReducer'
import assignmentsReducer from './assignmentsReducer'
import coursesReducer from './coursesReducer'
import usersReducer from './usersReducer'

export default combineReducers({
  auth: authReducer,
  assignments: assignmentsReducer,
  courses: coursesReducer,
  currentUser: usersReducer,
})
