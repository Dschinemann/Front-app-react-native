import React, { useState, useEffect, useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar, Rating } from 'react-native-elements'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import api from '../../services/api'
import styles from './styles'



export default function Perfil() {
    const navigate = useNavigation()
    const [rating, setrating] = useState(0)
    const [userName, setUserName] = useState('')
    const [image, setImage] = useState(null)
    const [ocupacao, setOcupacao] = useState('%')


    
    
    useEffect(()=>{
        const reload =navigate.addListener('focus',()=>{
            userConfig()
            MinhaFoto()
            profissao()
            nota()
        })
        return reload
    },[])
    
    function newAlert() {
        navigate.navigate('novoAlerta')
    }
    function minhaFoto() {
        navigate.navigate('minhaFoto')
    }

    function TodosAlertas(ocupacao) {
        navigate.navigate('todosAlertas',{ocupacao})
    }
    function NavegarMeuasAlertas() {
        navigate.navigate('meusAlertas')
    }
    async function userConfig() {
        const userconfig = await AsyncStorage.getItem('@user_user_name')
        const fotoPerfil = await AsyncStorage.getItem('@fotoPerfil')       
        setUserName(userconfig)
        setImage(fotoPerfil)


    }
    
    async function irParaMinhasInscricoes() {
        navigate.navigate('minhasInsc')
    }

    async function MinhaFoto() {
        const response = await api.get('/user/minhaFoto')
        setImage(response.data)
    }

    async function nota(){
        const user_id = await AsyncStorage.getItem('@user_user_id')
        try {
            const media =  await api.post(`/user/rating?user_id=${user_id}`)
            setrating(media.data)
           
        } catch (error) {
           
        }
    }

    async function profissao() {              
        const habilidade = await AsyncStorage.getItem('@ocupacao')
        setOcupacao(habilidade)
        
    }


    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Seja bem Vindo</Text>
            <View style={styles.containerAvatar}>
                <TouchableOpacity onPress={minhaFoto}>
                    <Avatar                       
                        source={{
                            uri: image
                                ? image
                                : 'https://th.bing.com/th/id/OIP.ehFdDj_opqs8MF9a7I5DfgHaHa?w=209&h=199&c=7&o=5&pid=1.7'
                        }}
                        rounded={true}
                        size='large'
                    />
                </TouchableOpacity>
                <View style={{justifyContent:"center"}}>
                <Text style={styles.textAvatar}>{userName}</Text>
                </View>
            </View>

            <View style={styles.containerRating}>
                <Rating             
                    reviews={false}
                    imageSize={40}
                    ratingCount={5}
                    readonly={true}                                        
                    startingValue={rating}                    
                    tintColor={"#6495ED"}
                />
            </View>
            <View style={styles.containerText}>
                <TouchableOpacity onPress={()=>TodosAlertas(ocupacao)}>
                    <Text style={styles.text}>Veja as oportunidades para seu perfil!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={NavegarMeuasAlertas}>
                    <Text style={styles.text}>Meus Alertas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={irParaMinhasInscricoes}>
                    <Text style={styles.text}>Alertas que estou Inscrito</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={newAlert}>
                    <Text style={styles.text}>Criar Alerta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate.navigate('ocupacao')}>
                    <Text style={styles.text}>Selecione sua habilidade</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate.navigate('mensagens')}>
                    <Text style={styles.text}>Mensagens</Text>
                </TouchableOpacity>

            </View>


        </View>
    )

}