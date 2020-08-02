import React, { createContext, useState, useEffect} from 'react';
import * as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../services/api'


const AuthContext = createContext({signed:false,user:{},loading:true});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@PortalMo:user')
            const storageToken = await AsyncStorage.getItem('@PortalMo:token')
            
            if(storageToken && storageUser){
                // Api.defaults.headers['TokenAuthorization'] = `Bearer${storageToken}`
                const {id} = JSON.parse(storageUser)
               
                Api.defaults.headers.Authorization = id
                setUser(JSON.parse(storageUser))
                setLoading(false)
            } else if (!storageToken && !storageUser){
                setLoading(false)
            }
        }
        loadStorage()
    },[])
    

    async function signIn(email, password){
        const response = await auth.SignIn(email, password)
        setUser(response.data.user)

        //api.defaults.headers['TokenAuthorization'] = `Bearer${response.token}`
        Api.defaults.headers.Authorization = response.data.user.id

        await AsyncStorage.multiSet([
            ['@PortalMo:user',JSON.stringify(response.data.user)],
            ['@PortalMo:token', response.data.token]
        ])
    }
    
    return(
        <AuthContext.Provider value={{signed: !!user,user,signIn,loading}}>
            {children}
        </AuthContext.Provider>
    )
    
};
export default AuthContext;
