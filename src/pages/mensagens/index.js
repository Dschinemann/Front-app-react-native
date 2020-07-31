import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import api from '../../services/api'




export default function Mensagens() {
    const navigation = useNavigation()
    const [mensagens, setMensagens] = useState([])
   

    async function loadConversation() {
        try {
            const response = await api.get('/conversation/index')
            getUnique(response.data)
            
        } catch (error) {
            Alert.alert('erro ao enviar dados')
        }
        
    }

    function msgRoom(msg){
        navigation.navigate('inbox', { msg })
        
    }
   
    function getUnique(mensagem, comp) {

       
        const unique = mensagem.map(e => e[comp])

            .map((e, i, final) => final.indexOf(e) === i && i)

            .filter((e) => mensagem[e]).map(e => mensagem[e]);
            
        return setMensagens(unique);
        
    }

   

    useEffect(() => {
        loadConversation()       
       
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Temos mensagens para você!</Text>

            <View >

                <FlatList
                    data={mensagens}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={msg => String(msg.id)}
                    onEndReached={loadConversation}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: msg }) => (
                        <TouchableOpacity onPress={() => msgRoom(msg)}>
                            <View style={styles.msg}>
                                <Text style={styles.nome}>Alerta {msg.alert_id}</Text>
                                <Text style={styles.mensagemText}>{msg.text}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

            </View>

        </View>

        

    )

}