import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native'
import { Avatar, Rating } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../context/auth'
import api from '../../services/api'
import styles from './styles'




export default function Perfil() {
    const { user, foto, image } = useContext(AuthContext)
    const navigate = useNavigation()
    const [rating, setrating] = useState(0)
    const [ocupacao, setOcupacao] = useState('%')
    

    useEffect(() => {
        const reload = navigate.addListener('focus', () => {
            profissao()
            nota()
            foto()//chamar a foto do usuario!
        })
        return reload

    }, [])

    function newAlert() {
        navigate.navigate('NovoAlerta')
    }
    function minhaFoto() {
        navigate.navigate('fotoPerfil')
    }

    function TodosAlertas(ocupacao) {
        navigate.navigate('todosAlertas', { ocupacao })
    }

    async function irParaMinhasInscricoes() {
        navigate.navigate('minhasInsc')
    }

    async function nota() {

        try {
            const media = await api.post(`/user/rating?user_id=${user.id}`)
            setrating(media.data)

        } catch (error) {

        }
    }

    async function profissao() {
        try {
            const response = await api.get('/ocupacao/userOcup')
            setOcupacao(response.data.ocup_id)
        } catch (error) {
            Alert.alert('Cadastre uma profissão para seu perfil!')

        }


    }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Seja bem Vindo</Text>
            </View>
            <View style={styles.containerAvatar}>
                <TouchableOpacity onPress={minhaFoto}>
                    <Avatar
                        source={{
                            uri: image
                                ? image.url
                                : 'https://th.bing.com/th/id/OIP.ehFdDj_opqs8MF9a7I5DfgHaHa?w=209&h=199&c=7&o=5&pid=1.7'
                        }}
                        rounded={true}
                        size='large'
                    />
                </TouchableOpacity>
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.textAvatar}>{user.name}</Text>
                </View>
            </View>

            <View>
                <Rating
                    reviews={false}
                    imageSize={40}
                    ratingCount={5}
                    readonly={true}
                    startingValue={rating}
                    tintColor={"#FFFFE0"}
                />
            </View>
            <View style={styles.containerText}>
                <TouchableOpacity onPress={() => TodosAlertas(ocupacao)}>
                    <Text style={styles.text}>Veja as oportunidades para seu perfil!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={irParaMinhasInscricoes}>
                    <Text style={styles.text}>Alertas que estou Inscrito</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={newAlert}>
                    <Text style={styles.text}>Criar Alerta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate.navigate('ocupacao')}>
                    <Text style={styles.text}>Selecione sua Profissão</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate.navigate('Mensagens')}>
                    <Text style={styles.text}>Mensagens</Text>
                </TouchableOpacity>

            </View>
                </ScrollView>
            </SafeAreaView>

        </View>
    )

}