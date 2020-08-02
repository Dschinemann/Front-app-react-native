import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import MultiSelect from 'react-native-multiple-select'
import PropTypes from 'prop-types'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage';


export default class Ocupacao extends Component {

    state = {
        selectedItems: [],
        items: []
    }
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    }


    async ocupacao(val) {
        const respose = await api.get(`/ocupacao?search=${val}`)
        this.setState({ items: respose.data })
    }


    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    async enviarOcupacao(selectedItems){
        const respose = await api.post('/ocupacao/create',{
            codigo:selectedItems
        })
        Alert.alert(respose.data)
        this.props.navigation.navigate('perfil')
    }
    async atualizarOcup(selectedItems){
        const response = await api.put('/ocupacao/userUpdate',{
            codigo:selectedItems
        })
        this.storeData(selectedItems)
        Alert.alert(response.data)
        this.props.navigation.navigate('perfil')
        
    }

    storeData = async (selectedItems) => {
        try {
            await AsyncStorage.removeItem('@ocupacao')
            await AsyncStorage.setItem('@ocupacao', String(selectedItems))
                           
        } catch (e) {
          
        }
    }



    render() {
        const { selectedItems } = this.state
        const { items } = this.state

        return (
            <View style={{ flex: 1, marginLeft: 10, marginRight: 10,backgroundColor:"#FFDEAD" }}>
                <MultiSelect
                    hideTags
                    items={items}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Escolha suas habilidades"
                    searchInputPlaceholderText="Procurando ..."
                    onChangeInput={(val) => this.ocupacao(val)}
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
                <View>
                    {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ marginRight: 10, marginLeft: 10,color:'#414d', }}>Agora que você escolheu sua profissão, clique em enviar para finalizar seu cadastro!</Text>
                    <TouchableOpacity onPress={() => this.enviarOcupacao(selectedItems)}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10,color:'#414d', }}>Enviar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.atualizarOcup(selectedItems)}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10,color:'#414d', }}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}