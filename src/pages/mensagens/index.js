import React, { useState, useEffect,useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../context/auth'
import styles from './styles'
import api from '../../services/api'
import socket from '../../services/socket'




export default function Mensagens() {
    const navigation = useNavigation()
    const [mensagens, setMensagens] = useState([])   
    const {user} = useContext(AuthContext)
    const [page, setPage] = useState(1);

    async function loadConversation() {
        try {
            const response = await api.post(`/conversation/index?page=${page}`)
            //setMensagens(response.data)
            unicos(response.data)
            setPage(page + 1);
        } catch (error) {
            Alert.alert('erro ao enviar dados')
        }
    }
    
    function msgRoom(msg){
        navigation.navigate('inbox', { msg })
    }
   


    function unicos(mensagem){
        for (let index = 0; index < mensagem.length; index++) {
            const element = mensagem[index];
            setMensagens(oldmessages =>{
                return [
                    ...oldmessages,
                    element.id_msgs[0]
                ]

            })
        }
    }

    
 

    useEffect(() => {
        loadConversation()       
        socket.emit('user',{
            user:user.id,
            socketId:socket.id,
        })
        
    }, [])
  

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Temos mensagens para você!</Text>

            <View >

                <FlatList
                    data={mensagens}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={msg => String(msg.id_message)}
                    onEndReached={loadConversation}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: msg }) => (
                        <TouchableOpacity onPress={() => msgRoom(msg)}>
                            <View style={styles.msg}>
                                <Text style={styles.nome}>{msg.sender_name}</Text>
                                <Text style={styles.mensagemText}>{msg.text}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

            </View>

        </View>

        

    )

}