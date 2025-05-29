import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dot-list-api.vercel.app/api/v1/user',
  withCredentials: true,
})

export default api
