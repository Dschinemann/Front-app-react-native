import React, { useState, Component } from 'react';
import { Text, View, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'
import api from '../../services/api'
import DatePicker from 'react-native-date-picker'
import { differenceInYears } from 'date-fns'


import styles from './styles'



export default function CreateUser() {

  const navigation = useNavigation()


  const [date, setdate] = useState(new Date())
  const [name, setname] = useState('')
  const [idade, setidade] = useState("")
  const [nasc, setnasc] = useState('')
  const [cep, setcep] = useState('')
  const [telefone, settelefone] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [sexo, setsexo] = useState('')
  const [anunciante, setanunciante] = useState('')
  const [possui_mei_ou_cnpj, setpossui_mei_ou_cnpj] = useState('')

  const [sexoM, setsexoM] = useState(false)
  const [sexoF, setsexoF] = useState(true)

  const [anuncianteS, setanuncianteS] = useState(false)
  const [anuncianteN, setanuncianteN] = useState(true)

  const [possui_mei_ou_cnpjS, setpossui_mei_ou_cnpjS] = useState(false)
  const [possui_mei_ou_cnpjN, setpossui_mei_ou_cnpjN] = useState(true)



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
  function calculaIdade() {
    const age = differenceInYears(date, nasc)
    setidade(age)
  }

  async function createUser() {

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


      Alert.alert('Usuario criado, faça login com o email e senha cadastrados')
      navigation.navigate('login')
      return (response.data)

    } catch (error) {
      Alert.alert('Verifique seu cadastro, se ja tem email cadastrado com a gente, use recuperação de senha, na pagina de login')
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
              />
            </View>

            <Text>Selecione a data de nascimento</Text>

            <View style={styles.containerCalendar}>
              <DatePicker
                style={styles.dataPicker}
                date={date}
                onDateChange={(val) => setnasc(val)}
                locale='pt'
                mode={"date"}
              />
            </View>

            <View style={styles.containerInputs}>

            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={sexoF}
                onChange={() => sexoF ? setsexoM(true) : setsexoM(false)}
                onValueChange={() => sexoF ? setsexoF(false) : setsexoF(true)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Feminino</Text>

              <CheckBox
                value={sexoM}
                onChange={() => sexoM ? setsexoF(true) : setsexoF(false)}
                onValueChange={() => sexoM ? setsexoM(false) : setsexoM(true)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Masculino</Text>

            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                textContentType={"postalCode"}
                onBlur={calculaIdade}
                keyboardType={'number-pad'}
                onChangeText={(val) => setcep(val)}
                placeholder={'CEP'} />
            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                textContentType={"emailAddress"}
                onChangeText={(val) => setemail(val)}
                placeholder={'Email'} />
            </View>

            <Text>Anunciante?</Text>

            <View style={styles.checkboxContainer}>

              <CheckBox
                value={anuncianteS}
                onChange={() => anuncianteS ? setanuncianteN(true) : setanuncianteN(false)}
                onValueChange={() => anuncianteS ? setanuncianteS(false) : setanuncianteS(true)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Sim</Text>
              <CheckBox
                value={anuncianteN}
                onChange={() => anuncianteN ? setanuncianteS(true) : setanuncianteS(false)}
                onValueChange={() => anuncianteN ? setanuncianteN(false) : setanuncianteN(true)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Não</Text>
            </View>

            <Text>Possui MEI ou CNPJ ?</Text>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={possui_mei_ou_cnpjS}
                onChange={() => possui_mei_ou_cnpjS ? setpossui_mei_ou_cnpjN(true) : setpossui_mei_ou_cnpjN(false)}
                onValueChange={() => possui_mei_ou_cnpjS ? setpossui_mei_ou_cnpjS(false) : setpossui_mei_ou_cnpjS(true)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Sim</Text>
              <CheckBox
                value={possui_mei_ou_cnpjN}
                onChange={() => possui_mei_ou_cnpjN ? setpossui_mei_ou_cnpjS(true) : setpossui_mei_ou_cnpjS(false)}
                onValueChange={() => possui_mei_ou_cnpjN ? setpossui_mei_ou_cnpjN(false) : setpossui_mei_ou_cnpjN(true)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Não</Text>
            </View>

            
            <View style={styles.containerInputs}>
              <TextInput
                onBlur={loadSettings}
                style={styles.inputs}
                textContentType={"telephoneNumber"}
                onChangeText={(val) => settelefone(val)}
                keyboardType={"number-pad"}
                placeholder={'Telefone'} />
            </View>
            

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                textContentType={"password"}
                onChangeText={(val) => setpassword(val)}
                placeholder={'PassWord'} />
            </View>

            <View style={styles.containerButton}>
              <Button
                onPress={createUser}
                title="Enviar"
                color="#8B4513"
              />

            </View>

          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>

  );
}