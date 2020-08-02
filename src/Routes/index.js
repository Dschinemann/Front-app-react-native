import React, {useContext} from 'react'
import AuthContext from '../context/auth'
import { View,ActivityIndicator } from 'react-native'

import Auth from './routes.auth'
import Stacks from './routes.app'


const Routes = () => {

    const { signed,loading } = useContext(AuthContext)

    if(loading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#999"/>
            </View>
        )
    }

    return signed ? <Stacks/> : <Auth/>
}

export default Routes