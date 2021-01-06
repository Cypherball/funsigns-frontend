import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
  isLoggedIn: sessionStorage.getItem('jwtToken') ? true : false,
  jwtToken: sessionStorage.getItem('jwtToken')
    ? sessionStorage.getItem('jwtToken')
    : null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      sessionStorage.setItem('jwtToken', action.payload)
      return { ...state, isLoggedIn: true, jwtToken: action.payload }
    case LOGOUT:
      sessionStorage.removeItem('jwtToken')
      return { ...state, isLoggedIn: false, jwtToken: null }
    default:
      return state
  }
}
