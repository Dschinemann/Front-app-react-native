import React, { useState, useContext} from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, Text} from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import AuthContext from  '../../context/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';




export default function Login() {

  const {signed,signIn,loadReq} = useContext(AuthContext)

  const navigate = useNavigation()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

    

  function createUser() {
    navigate.navigate('createUser')
  }

  function validate(){
    if(email.length <= 0){
      return Alert.alert('E-mail não pode ser vazio')
    }
    if(password.length <= 0){
      return Alert.alert('Senha não pode ser vazio')
    }
    signIn(email,password)
  }

  return (


    <View style={styles.container}>

          <ActivityIndicator animating={loadReq}/>
            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                onChangeText={(val) => setemail(val)}
                placeholder={'Entre com seu email'}
                />
            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                onChangeText={(val) => setpassword(val)}
                placeholder={'Entre com sua senha'} />
            </View>
            <View style={styles.containerButton}>
            <TouchableOpacity onPress={validate}>
                <Text style={styles.title}>Entrar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerButton}>
              <TouchableOpacity onPress={createUser}>
                <Text style={styles.title}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity onPress={() => navigate.navigate('forgot')}>
                <Text style={styles.title}>Recupere sua Senha</Text>
              </TouchableOpacity>

            </View>

    </View>
  );
}