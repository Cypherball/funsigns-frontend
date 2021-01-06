import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
  isLoggedIn: null,
  jwtToken: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, jwtToken: action.payload }
    case LOGOUT:
      return { ...state, isLoggedIn: false, jwtToken: null }
    default:
      return state
  }
}
