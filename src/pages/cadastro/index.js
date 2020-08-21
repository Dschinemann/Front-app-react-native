import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'
import api from '../../services/api'
import DatePicker from 'react-native-date-picker'
import { differenceInYears } from 'date-fns'


import styles from './styles'



export default function CreateUser() {

  const navigation = useNavigation()


  const [date, setdate] = useState(new Date())
  const [nasc, setNasc] = useState('')
  const [name, setname] = useState('')
  const [idade, setidade] = useState('') 
  const [cep, setcep] = useState('')
  const [telefone, settelefone] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [sexo, setsexo] = useState('')
  const [anunciante, setanunciante] = useState('')
  const [possui_mei_ou_cnpj, setpossui_mei_ou_cnpj] = useState('')

  const [sexoM, setsexoM] = useState(false)
  const [sexoF, setsexoF] = useState(false)

  const [anuncianteS, setanuncianteS] = useState(false)
  const [anuncianteN, setanuncianteN] = useState(false)

  const [possui_mei_ou_cnpjS, setpossui_mei_ou_cnpjS] = useState(false)
  const [possui_mei_ou_cnpjN, setpossui_mei_ou_cnpjN] = useState(false)



  function loadSettings() {
    if (possui_mei_ou_cnpjS === false) {
      setpossui_mei_ou_cnpj('NÃO')
    } else {
      setpossui_mei_ou_cnpj('SIM')
    }

    if (anuncianteS === false) {
      setanunciante('NÃO')
    } else {
      setanunciante('SIM')
    }

    if (sexoM === true) {
      setsexo('MASC')
    } else {
      setsexo('FEM')
    }
  }

  function calculaIdade(nasc) {
    setNasc(nasc)
    const age = differenceInYears(date, nasc)
    setidade(age)
  }

  async function createUser() {
    
   
    if(name.length <= 0){
      return Alert.alert('Campo Nome não pode ser vazio!')
    }
    if(idade.length <= 0){
      return Alert.alert('Campo Data Nascimento não pode ser vazio!')
    }

    if(cep.length <=0){
      return Alert.alert('Campo Cep não pode ser vazio!')
    }
    if(email.length <=0){
      return Alert.alert('Campo Email não pode ser vazio!')
    }
    if(telefone.length <=0){
      return Alert.alert('Campo Telefone não pode ser vazio')
    }
    if(password.length <=0){
      return Alert.alert('Campo Senha não pode ser vazio')
    }
    if(anunciante.length <= 0){
      return Alert.alert('Campo Anunciante deve ser marcado!')
    }
    if(possui_mei_ou_cnpj.length <= 0){
      return Alert.alert('Campo Cnpj ou Mei deve ser marcado!')
    }
    if(sexo.length <=0){
      return Alert.alert('Campo Gênero deve ser marcado!')
    }

    try {

      const response = await api.post('/users', {
        name,
        idade,
        sexo,
        nasc,
        cep,
        email,
        anunciante,
        possui_mei_ou_cnpj,
        telefone,
        password
      })


      Alert.alert('Usuário criado, faça login com o email e senha cadastrados')
      navigation.navigate('Login')
      return (response.data)

    } catch (error) {
      Alert.alert(`Verifique seu cadastro, \nse já tem email cadastrado com a gente, \nuse recuperação de senha, na pagina de login`)
    }
  }

  return (


    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode={true} nestedScrollEnabled={true}>
          <KeyboardAvoidingView>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                placeholder={'Nome Completo'}
                textContentType={"username"}
                onChangeText={(val) => setname(val)}
                placeholderTextColor={'black'}
              />
            </View>

            <Text style={styles.titulos}>Selecione a data de nascimento</Text>

            <View style={styles.containerCalendar}>
              <DatePicker
                style={styles.dataPicker}
                date={date}
                onDateChange={(val) => calculaIdade(val)}
                format="YYYY-MM-DD"                
                locale='pt'
                mode={"date"}
              />
            </View>

            <View style={styles.containerInputs}>

            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={sexoF}
                onValueChange={(value) =>setsexoF(value)}
                onChange={() => sexoF ? setsexoM(true):setsexoM(false) }               
                style={styles.checkbox}
              />
              <Text style={styles.label}>Feminino</Text>

              <CheckBox
                value={sexoM}
                onValueChange={(value) =>setsexoM(value)}
                onChange={() => sexoM? setsexoF(true):setsexoF(false) }
                style={styles.checkbox}
              />
              <Text style={styles.label}>Masculino</Text>

            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                textContentType={"postalCode"}               
                keyboardType={'number-pad'}
                onChangeText={(val) => setcep(val)}
                placeholder={'CEP'}
                placeholderTextColor={'black'}
                />                
            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}                
                textContentType={"emailAddress"}
                onChangeText={(val) => setemail(val)}
                placeholder={'Email'} 
                placeholderTextColor={'black'}
                />
            </View>

            <Text style={styles.titulos}>Anunciante?</Text>

            <View style={styles.checkboxContainer}>

              <CheckBox
                value={anuncianteS}
                onValueChange={(value) =>setanuncianteS(value)}
                onChange={() => anuncianteS ? setanuncianteN(true):setanuncianteN(false) }
                style={styles.checkbox}
              />
              <Text style={styles.label}>Sim</Text>
              <CheckBox
                value={anuncianteN}
                onValueChange={(value) =>setanuncianteN(value)}
                onChange={() => anuncianteN ? setanuncianteS(true):setanuncianteS(false) }
                style={styles.checkbox}
              />
              <Text style={styles.label}>Não</Text>
            </View>

            <Text style={styles.titulos}>Possui MEI ou CNPJ ?</Text>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={possui_mei_ou_cnpjS}
                onValueChange={(value) =>setpossui_mei_ou_cnpjS(value)}
                onChange={() => possui_mei_ou_cnpjS ? setpossui_mei_ou_cnpjN(true):setpossui_mei_ou_cnpjN(false) }
                style={styles.checkbox}
              />
              <Text style={styles.label}>Sim</Text>
              <CheckBox
                value={possui_mei_ou_cnpjN}
                onValueChange={(value) =>setpossui_mei_ou_cnpjN(value)}
                onChange={() => possui_mei_ou_cnpjN ? setpossui_mei_ou_cnpjS(true):setpossui_mei_ou_cnpjS(false) }
                style={styles.checkbox}
              />
              <Text style={styles.label}>Não</Text>
            </View>

            
            <View style={styles.containerInputs}>
              <TextInput                
                style={styles.inputs}
                textContentType={"telephoneNumber"}
                onChangeText={(val) => settelefone(val)}
                onBlur={loadSettings}
                keyboardType={"number-pad"}
                placeholder={'Telefone'} />
            </View>
            

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                textContentType={"password"}
                onChangeText={(val) => setpassword(val)}
                onBlur={loadSettings}
                placeholder={'PassWord'} />
            </View>

            <View style={styles.create}>
            <TouchableOpacity onPress={createUser}>
                <Text style={styles.title}>Enviar</Text>
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>

  );
}