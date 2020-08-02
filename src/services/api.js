import axios from 'axios'
import { API_URL } from '../../.env.json'




const Api = axios.create({
    baseURL: API_URL
})

/*Api.interceptors.request.use((config) => {
    try {
        
        if (user_id) {
            config.headers.Authorization = user.id
        }
        return config
    } catch (error) {
        
    }
})
*/

export default Api



