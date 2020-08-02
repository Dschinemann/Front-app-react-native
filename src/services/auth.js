import api from './api'

export async function SignIn(email,password){    
     return response = await api.post('/users/login', {
            email,
            password
        })

}