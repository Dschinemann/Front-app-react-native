import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react';
import {StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/Routes/index'
import { AuthProvider } from './src/context/auth'

export default function App() {

  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor='#414d' />
    <NavigationContainer >
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
    </>
  )
}