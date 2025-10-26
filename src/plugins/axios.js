import axios from 'axios'

const api = axios.create({
  baseURL: 'https://backend-nexus-digv.onrender.com/api/'
})

// Interceptor para enviar token JWT automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
