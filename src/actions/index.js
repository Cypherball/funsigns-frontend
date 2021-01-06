import {
  LOGIN,
  LOGOUT,
  CREATE_USER,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  EDIT_ASSIGNMENT,
  GET_ASSIGNMENT,
  GET_ASSIGNMENTS,
} from './types'

import axios from 'axios'

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

// Assignments ---------------------------------------------------------------

export const createAssignment = (formValues) => async (dispatch, getState) => {
  const { jwtToken } = getState().auth
  const response = await axios.post(
    'https://funsigns.herokuapp.com/assignments',
    formValues,
    { headers: { Authorization: 'Bearer ' + jwtToken } }
  )
  dispatch({
    type: CREATE_ASSIGNMENT,
    payload: response.data,
  })
}

export const getAssignment = (id) => async (dispatch, getState) => {
  const { jwtToken } = getState().auth
  const response = await axios.get(
    `https://funsigns.herokuapp.com/assignments/${id}`,
    {
      headers: { Authorization: 'Bearer ' + jwtToken },
    }
  )
  dispatch({
    type: GET_ASSIGNMENT,
    payload: response.data,
  })
}

export const getAssignments = () => async (dispatch, getState) => {
  const { jwtToken } = getState().auth
  console.log(jwtToken)
  try {
    const response = await axios.get(
      'https://funsigns.herokuapp.com/assignments',
      {
        headers: { Authorization: 'Bearer ' + jwtToken },
      }
    )
    dispatch({
      type: GET_ASSIGNMENTS,
      payload: response.data,
    })
  } catch {
    return null
  }
}

export const editAssignment = (id, formValues) => async (
  dispatch,
  getState
) => {
  const { jwtToken } = getState().auth
  const response = await axios.get(
    `https://funsigns.herokuapp.com/assignments/${id}`,
    formValues,
    {
      headers: { Authorization: 'Bearer ' + jwtToken },
    }
  )
  dispatch({
    type: EDIT_ASSIGNMENT,
    payload: response.data,
  })
}

export const deleteAssignment = (id) => async (dispatch, getState) => {
  const { jwtToken } = getState().auth
  await axios.delete(`https://funsigns.herokuapp.com/assignments/${id}`, null, {
    headers: { Authorization: 'Bearer ' + jwtToken },
  })
  dispatch({
    type: DELETE_ASSIGNMENT,
    payload: id,
  })
}
