import React,{useState} from 'react';
import { View, TextInput, Button, Alert,ActivityIndicator, Text } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import styles from './styles'
import api from '../../services/api'
import { TouchableOpacity } from 'react-native-gesture-handler';





export default function Forgotpass() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [NewPassWord, setNewPassWord] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    async function validate(){
        if(email.length <=0){
            return Alert.alert('E-mail não pode ser vazio!')
        }
        if(password.length <=0){
            return Alert.alert('Senha não pode ser vazio!')
        }else if(password.length < 6){
            return Alert.alert(`Senha não pode ser menor \nque 6 digitos!`)
        }

        if(password != NewPassWord){
            return Alert.alert('As senhas precisam ser identicas')
        }
        setLoading(true)
        try {
            const response = await api.put('/users/forgotPassword', {
                email,
                password
            })            
            setLoading(false)
            Alert.alert(
              "Aviso!",
              `${response.data} \nNa página de login entre com sua nova senha! `,
              [
                { text: "OK", onPress: () => navigation.navigate('Login') }
              ],
              { cancelable: false }
          );
            
        } catch (error) {
            Alert.alert('Erro ao enviar dados')
            
            setLoading(false)
        }



    }


  return (

    <View style={styles.container}>
        <ActivityIndicator animating={loading} size="large" color="#999" />
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
            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                onChangeText={(val) => setNewPassWord(val)}
                placeholder={'Repita sua senha'} />
            </View>
            <View style={styles.containerInputs}>
              <TouchableOpacity onPress={validate}>
                <Text style={styles.title}>Enviar</Text>
              </TouchableOpacity>

            </View>

    </View>
  );
}