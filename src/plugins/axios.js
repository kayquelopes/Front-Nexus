import axios from "axios"

let cancelToken

const api = axios.create({
 baseURL: 'http://127.0.0.1:8000/'
})

api.interceptors.request.use(config => {
  if (cancelToken) {
    cancelToken.cancel("Cancelando requisição anterior")
  }

  cancelToken = axios.CancelToken.source()
  config.cancelToken = cancelToken.token

  const token = localStorage.getItem("accessToken")
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

export default api
