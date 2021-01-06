import { combineReducers } from 'redux'
import authReducer from './authReducer'
import assignmentsReducer from './assignmentsReducer'

export default combineReducers({
  auth: authReducer,
  assignments: assignmentsReducer,
})
