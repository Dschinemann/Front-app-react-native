import axios from 'axios'
import { API_URL, API_URL_LOCAL } from '../../.env.json'




const Api = axios.create({
    baseURL: API_URL
})



export default Api



