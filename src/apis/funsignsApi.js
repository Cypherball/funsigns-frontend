import axios from 'axios'

const token = 'nitishdev'
export default axios.create({
  baseURL: 'https://funsigns.herokuapp.com',
  headers: { Authorization: 'Bearer ' + token },
})
