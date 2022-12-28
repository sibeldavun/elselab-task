import axios from 'axios'

const axiosIns = axios.create({
  baseURL:'https://test-api.elselab.io/api/',
  timeout: 1000,
})

export default axiosIns
