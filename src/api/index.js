import axios from 'axios'

let config = {
  baseURL: import.meta.env.DEV
    ? 'http://localhost:8080/api' // <-- LOCAL backend
    : 'https://api.haddix.la/api', // <-- PRODUCTION backend
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
}

const api = axios.create(config)

export default api


/* const API_BASE = import.meta.env.PROD
  ? 'https://api.yourdomain.com/api'
  : 'http://localhost:5000/api'; */