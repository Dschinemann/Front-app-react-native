import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { API_URL } from '../../.env.json'



const Api = axios.create({
    baseURL: API_URL
})

Api.interceptors.request.use(async (config) => {
    try {
        const user_id = JSON.parse(await AsyncStorage.getItem('@user_user_id'))
        if (user_id) {
            config.headers.Authorization = user_id
        }
        return config
    } catch (error) {
        
    }
})


export default Api



