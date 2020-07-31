import React, { useState, useEffect, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, TextInput, Button, Alert } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'



export default function Login() {

  const navigation = useNavigation()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [logged, setLogged] = useState(false)


  function CreateUser() {
    navigation.navigate('createUser')
  }

  async function verificaLogin() {
    const token = await AsyncStorage.getItem('@user_token')
    const user = JSON.parse(await AsyncStorage.getItem('@user_user'))

    if (token && user) {
      setLogged(true)
    }
    if (logged) {
      navigation.navigate('perfil')
    }
  }

  useLayoutEffect(()=>{
    verificaLogin()
  },[logged])
  


  async function Sign() {
    try {

      const response = await api.post('/users/login', {
        email,
        password
      })
      const { user, token } = response.data
      try {
        await AsyncStorage.multiSet([
          ['@user_token', token],
          ['@user_user', JSON.stringify(user)],
          ['@user_user_name', user.name],
          ['@user_user_id', JSON.stringify(user.id)]
        ])

        navigation.navigate('perfil')
      } catch (error) {

        Alert.alert('Ops! Tente Novamente')

      }

    } catch (error) {

      Alert.alert('verifique seu email e senha e tente novamente, não se lembra? use a recuperação de senha!')

    }

  }
  function irLogin() {
    navigation.navigate('perfil')
  }
 

  return (


    <View style={styles.container}>

      <View>
        {logged == false &&
          <View style={styles.container}>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                onChangeText={(val) => setemail(val)}
                placeholder={'Entre com seu email'} />
            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                onChangeText={(val) => setpassword(val)}
                placeholder={'Entre com sua senha'} />
            </View>
            <View style={styles.containerButton}>
              <Button
                onPress={Sign}
                title="Entrar"
                color="#8B4513"
              />
            </View>

            <View style={styles.containerButton}>
              <Button
                onPress={CreateUser}
                title="Cadastre-se"
                color="#8B4513"
              />
            </View>

          </View>
        }
      </View>
      <View style={styles.containerButton}>
        { logged == true &&
          <Button
            onPress={irLogin}
            title="Entrar"
            color="#8B4513"                       
          />
        }

      </View>
    </View>
  );
}