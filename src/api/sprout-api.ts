import axios from 'axios'

const SPROUT_URL = import.meta.env.VITE_API_URL

const sproutApi = axios.create({
  baseURL: SPROUT_URL,
})

export default sproutApi
