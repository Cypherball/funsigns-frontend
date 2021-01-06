import axios from 'axios'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRhNGJmZjM4YWJlMjg4NDM5N2QwNyIsImlhdCI6MTYwOTkzODUxOSwiZXhwIjoxNjEyNTMwNTE5fQ.iEOLjoDF2tb9vhOkTn_XWJYSG0sJrzehfeuYC66fg9E'
export default axios.create({
  baseURL: 'https://funsigns.herokuapp.com',
  headers: { Authorization: 'Bearer ' + token },
})
