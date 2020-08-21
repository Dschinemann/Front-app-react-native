import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from '../pages/login';
import CreateUser from '../pages/cadastro';
import ForgotPass from '../pages/forgotPass';



const Auth = () => {

    return (

        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name='Login' component={Login} />
            <AppStack.Screen name='createUser' component={CreateUser} />
            <AppStack.Screen name='forgot' component={ForgotPass} />
        </AppStack.Navigator>

    )
};
export default Auth;
