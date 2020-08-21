import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native'
import * as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../services/api';


const AuthContext = createContext({ signed: false, user: {}, loading: true });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadReq, setLoadReq] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@PortalMo:user')
            const storageToken = await AsyncStorage.getItem('@PortalMo:token')

            if (storageToken && storageUser) {
                // Api.defaults.headers['TokenAuthorization'] = `Bearer${storageToken}`
                const { id } = JSON.parse(storageUser)

                Api.defaults.headers.Authorization = id
                setUser(JSON.parse(storageUser))
                setLoading(false)
            } else if (!storageToken && !storageUser) {
                setLoading(false)
            }
        }
        loadStorage()
    }, [])


    async function signIn(email, password) {
        setLoadReq(true)
        try {
            const response = await auth.SignIn(email, password)
            setUser(response.data.user)
            Api.defaults.headers.Authorization = response.data.user.id

            await AsyncStorage.multiSet([
                ['@PortalMo:user', JSON.stringify(response.data.user)],
                ['@PortalMo:token', response.data.token]
            ])
            setLoadReq(false)
        } catch (error) {
            Alert.alert('Verifique seu e-mail e senha!')
            setLoadReq(false)
        }

        //api.defaults.headers['TokenAuthorization'] = `Bearer${response.token}`


    }

    async function foto() {
        const response = await auth.MinhaFoto()
        setImage(response.data)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, loading, foto, image,loadReq }}>         
            {children}
        </AuthContext.Provider>
    )

};
export default AuthContext;
