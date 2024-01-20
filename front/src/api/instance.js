import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://192.168.1.37:7001',
})

export default instance
