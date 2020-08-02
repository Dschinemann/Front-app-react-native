import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from '../pages/login';
import CreateUser from '../pages/cadastro';



const Auth = () => {

    return (

        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name='Login' component={Login} />
            <AppStack.Screen name='createUser' component={CreateUser} />
        </AppStack.Navigator>

    )
};
export default Auth;
