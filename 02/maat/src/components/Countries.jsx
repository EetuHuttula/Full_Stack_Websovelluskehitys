import axios from 'axios'

const baseUrl = 'https://restcountries.com/v2/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const service = {getAll}
export default service