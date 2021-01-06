import {
  LOGIN,
  LOGOUT,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  EDIT_ASSIGNMENT,
  GET_ASSIGNMENT,
  GET_ASSIGNMENTS,
} from './types'
import funsignsApi from '../apis/funsignsApi'

export const login = (jwtToken) => {
  return {
    type: LOGIN,
    payload: jwtToken,
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const createAssignment = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const response = await funsignsApi.post('/assignments', {
    ...formValues,
    userId,
  })
  dispatch({
    type: CREATE_ASSIGNMENT,
    payload: response.data,
  })
}

export const getAssignment = (id) => async (dispatch) => {
  const response = await funsignsApi.get(`/assignments/${id}`)
  dispatch({
    type: GET_ASSIGNMENT,
    payload: response.data,
  })
}

export const getAssignments = () => async (dispatch) => {
  try {
    const response = await funsignsApi.get('/assignments')
    dispatch({
      type: GET_ASSIGNMENTS,
      payload: response.data,
    })
  } catch {
    return null
  }
}

export const editAssignment = (id, formValues) => async (dispatch) => {
  const response = await funsignsApi.get(`/assignments/${id}`, formValues)
  dispatch({
    type: EDIT_ASSIGNMENT,
    payload: response.data,
  })
}

export const deleteAssignment = (id) => async (dispatch) => {
  await funsignsApi.delete(`/assignments/${id}`)
  dispatch({
    type: DELETE_ASSIGNMENT,
    payload: id,
  })
}
