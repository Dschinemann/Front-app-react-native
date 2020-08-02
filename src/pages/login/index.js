import React, { useState, useContext, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, TextInput, Button, Alert } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import AuthContext from  '../../context/auth'




export default function Login() {

  const {signed,signIn} = useContext(AuthContext)

  const navigate = useNavigation()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

    

  function createUser() {
    navigate.navigate('createUser')
  }

  return (


    <View style={styles.container}>

      <View>
        
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
                onPress={() => signIn(email,password)}
                title="Entrar"
                color='#414d'
              />
            </View>

            <View style={styles.containerButton}>
              <Button
                onPress={createUser}
                title="Cadastre-se"
                color='#414d'
              />
            </View>

          </View>
        
      </View>

    </View>
  );
}