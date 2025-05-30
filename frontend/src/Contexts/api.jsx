import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dotlist-1.onrender.com/api/v1/user',
  withCredentials: true,
})

export default api
