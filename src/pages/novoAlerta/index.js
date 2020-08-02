import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Button, Alert, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MultiSelect from 'react-native-multiple-select'
import styles from './styles'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity } from 'react-native'




export default function NovoAlerta() {
    const navigation = useNavigation()
    const [titulo, settitulo] = useState('')
    const [descricao, setdescricao] = useState('')
    const [valor, setValor] = useState('')
    const [currency, setCurrency] = useState(0)    
    const [local, setlocal] = useState({})
    const [cep, setcep] = useState('')
    const [tipo_de_profissão, setTipo_de_profissão] = useState('')
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState([])


    async function createAlert() {
        const user_id = await AsyncStorage.getItem('@user_user_id')
        
        if(titulo.length == 0){
            return Alert.alert(' Campo Titulo não pode ser vazio!')
        }
        if(descricao.length == 0){
            return Alert.alert(' Campo Descrição não pode ser vazio!')
        }
        if(isNaN(valor)){
            return Alert.alert('Caracter invalido para o campo valor!')
        }
        if(tipo_de_profissão.length == 0){
            return Alert.alert(' Campo Profissão não pode ser vazio!')
        }
        if(cep.length == 0){
            return Alert.alert(' Campo CEP não pode ser vazio!')
        }


        try {
            const response = await api.post(`/users/${user_id}/novoAlerta`, {
                titulo,
                descricao,
                valor,
                local: local.bairro,
                cep,
                tipoDeProfissão: tipo_de_profissão
            })
            Alert.alert('Alerta criado com Sucesso')
            navigation.navigate('perfil')

        } catch (error) {
            Alert.alert('Houve um erro durante a solicitação, tente novamente!')
        }
    }

    async function ocupacao(val) {
        const respose = await api.get(`/ocupacao?search=${val}`)
        setItems(respose.data)
    }

    function onSelectedItemsChange(selectedItems) {
        setSelectedItems(selectedItems)
        setTipo_de_profissão(selectedItems)
    }

    async function consultaCep(val) {
       
        if(val.length < 8){
            return Alert.alert('Cep incompleto')
        }else if (isNaN(val)){
            return Alert.alert('Não é permitido espaços ou letras para o campo cep!')
        }        
        
        if(val.length > 8){
            return         Alert.alert(
                'Aviso',
                `Cep contém mais digitos que o esperado!  Esperado 8 contém ${val.length} digitos`,
                [
                    {
                        text: 'Ok',
                        onPress: () => { },
                        style: 'cancel'
                    },
                   
                ]
            )
        }
          const response = await fetch(`https://viacep.com.br/ws/${val}/json/`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setlocal(response))
            .catch((error) => Alert.alert('Houve um erro na solicitação de endereço'))     
        }
            
    function formatNumber(val){
        const numeroFormat = val.toString().replace(',','.')
        setValor(numeroFormat)
    
    }
    function numeroFormatado(){
        setCurrency(          
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(valor))
        ) 
    }
  
    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View >
                        <Text style={styles.header}>Do que você esta precisando?</Text>
                        <View style={styles.inputContainer}>
                            <View style={{paddingTop:5,paddingBottom:5}}>
                                <TextInput
                                    style={styles.inputs}
                                    onChangeText={(val) => settitulo(val)}                                   
                                    placeholder={'Dê um titulo para este alerta!'}
                                    autoCapitalize={"words"}
                                    autoCorrect={false}
                                    multiline={true}s                                    
                                />
                            <View style={{paddingTop:5,paddingBottom:5}}>
                                <TextInput
                                    style={styles.inputs}
                                    onChangeText={(val) => setdescricao(val)}
                                    multiline={true}
                                    autoCorrect={false}
                                    autoCapitalize={"words"}
                                    textAlignVertical={"top"}
                                    selectTextOnFocus={true}
                                    placeholder={'Descreva a tarefa a ser executada!'}
                                />
                            </View>

                                <TextInput
                                    style={styles.inputs}
                                    value={currency}                                   
                                    onChangeText={(val)=> formatNumber(val)}
                                    onEndEditing={() => numeroFormatado()}
                                    onFocus={() => setCurrency(0)}                                 
                                    placeholder={'Quanto pretende pagar'}
                                    keyboardType={"numbers-and-punctuation"}                                   
                                />
                            </View>

                            <View style={styles.multiselect}>
                                <MultiSelect                                    
                                    hideTags
                                    items={items}
                                    fontSize={20}                                    
                                    uniqueKey="id"                                   
                                    textColor='gray'                                    
                                    onSelectedItemsChange={(val) => onSelectedItemsChange(val)}
                                    selectedItems={selectedItems}
                                    selectText="Escolha o tipo de profissinal"
                                    searchInputPlaceholderText="Procurando ..."
                                    onChangeInput={(val) => ocupacao(val)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="blue"
                                    tagBorderColor="blue"
                                    tagTextColor="blue"
                                    selectedItemTextColor="blue"
                                    selectedItemIconColor="blue"
                                    itemTextColor="black"
                                    displayKey="titulo"
                                    searchInputStyle={{ color: 'blue' }}
                                    submitButtonColor="blue"
                                    submitButtonText="Pronto"
                                    single={true}
                                />
                            </View>

                            <View>
                                <Text style={styles.header}>Informe a localização </Text>
                                <View>
                                    <TextInput
                                        style={styles.inputs}
                                        onChangeText={(val) => setcep(val)}
                                        onEndEditing={(e) => consultaCep(e.nativeEvent.text)}
                                        placeholder={'CEP'}
                                        keyboardType={"decimal-pad"}
                                    />
                                </View>
                                <View style={styles.viewLocal}>
                                    <Text style={styles.local}>{local.bairro}</Text>
                                    <Text style={styles.local}>{local.localidade}</Text>
                                    <Text style={styles.local}>{local.uf}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={{flex:1, alignItems:"center"}} onPress={createAlert}>
                                <Text style={styles.button}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )

}