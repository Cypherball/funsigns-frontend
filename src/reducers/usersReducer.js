import { GET_LOGGED_IN_USER } from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_USER:
      return action.payload
    default:
      return state
  }
}
