import axios from 'axios'

let config = {
  // baseURL: import.meta.env.VITE_BASE_API_URL || 'http://localhost:8080/api/',
  baseURL: 'https://api.haddix.la/api',
  
  // timeout: 1000, // 1 second
  // withCredentials: true, // check cross-site Access-Control
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
}

const api = axios.create(config)

export default api


/* const API_BASE = import.meta.env.PROD
  ? 'https://api.yourdomain.com/api'
  : 'http://localhost:5000/api'; */