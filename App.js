import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/Routes/index'
import {AuthProvider} from './src/context/auth'


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}