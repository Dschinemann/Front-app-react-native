import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Button, Alert } from 'react-native'
import { useNavigation, NavigationHelpersContext } from '@react-navigation/native'
import MultiSelect from 'react-native-multiple-select'
import styles from './styles'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'



export default function NovoAlerta() {
    const navigation = useNavigation()
    const [titulo, settitulo] = useState('')
    const [descricao, setdescricao] = useState('')
    const [valor, setvalor] = useState('')
    const [local, setlocal] = useState('')
    const [cep, setcep] = useState('')
    const [tipo_de_profissão, setTipo_de_profissão] = useState('')
    const [selectedItems, setSelectedItems] =useState([])
    const [items,setItems]= useState([])


    async function createAlert() {
        const user_id = await AsyncStorage.getItem('@user_user_id')
        try {

            const response = await api.post(`/users/${user_id}/novoAlerta`, {
                titulo,
                descricao,
                valor,
                local,
                cep,
                tipoDeProfissão:tipo_de_profissão
            })
            Alert.alert('Alerta criado com Sucesso')
            navigation.navigate('perfil')

        } catch (error) {
            Alert.alert('Houve um erro durante a solicitação, tente novamente!')
        }
    }

    async function ocupacao(val){
        const respose = await api.get(`/ocupacao?search=${val}`)
        setItems(respose.data)
    }

    function onSelectedItemsChange(selectedItems){
        setSelectedItems(selectedItems)
        setTipo_de_profissão(selectedItems)
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <View style={styles.container} >
                    <Text>Do que você esta precisando?</Text>
                    <View style={styles.containerAlerta}>
                        <View style={styles.containerInputs}>
                            <TextInput
                                onChangeText={(val) => settitulo(val)}
                                placeholder={'Dê um titulo para este alerta!'}
                                autoCapitalize={"words"}
                                autoCorrect={false}
                                multiline={true}
                                style={styles.inputs} />
                        </View>
                        <View style={styles.containerInputs}>
                            <TextInput
                                onChangeText={(val) => setdescricao(val)}
                                multiline={true}
                                autoCorrect={false}
                                autoCapitalize={"words"}
                                textAlignVertical={"top"}
                                selectTextOnFocus={true}
                                placeholder={'Descreva a tarefa a ser executada!'}
                                style={styles.textArea} />
                        </View>
                        <View style={{ flex: 1, marginLeft:10, marginRight:10,width:300 }}>
                            <MultiSelect
                                hideTags
                                items={items}
                                uniqueKey="id"                               
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
                        <View style={styles.containerInputs}>
                            <TextInput
                                onChangeText={(val) => setvalor(val)}
                                placeholder={'Quanto pretende pagar'}
                                keyboardType={"numeric"}
                                style={styles.inputs} />
                        </View>

                        <View style={styles.containerEndereço}>
                            <Text>Local APROXIMADO de onde será executada a tarefa!</Text>
                            <View style={styles.containerInputs}>
                                <TextInput
                                    onChangeText={(val) => setlocal(val)}
                                    placeholder={'Um ponto de referência,Rua, Bairro'}
                                    style={styles.inputs} />
                            </View>
                            <View style={styles.containerInputs}>
                                <TextInput
                                    onChangeText={(val) => setcep(val)}
                                    placeholder={'CEP'}
                                    keyboardType={"decimal-pad"}
                                    style={styles.inputs} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerButton}>
                        <Button
                            onPress={createAlert}
                            title={'Enviar'}
                            color={'gray'}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )

}