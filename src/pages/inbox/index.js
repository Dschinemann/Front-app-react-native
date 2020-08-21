import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import api from '../../services/api'
import socket from '../../services/socket'
import AuthContext from '../../context/auth'
import { View, Text } from 'react-native'
import styles from './styles'

export default function Inbox() {
    const { user, image } = useContext(AuthContext);
    const routes = useRoute();
    const [UserReceiver, setUserReceiver] = useState({});
    const msg = routes.params.msg;
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);

    async function loadPrivateMsg() {
        const response = await api.post(`/conversation/messages?page=${page}`, {
            id_message: msg.id_message
        });
        setPage(page + 1);
        tratarMsg(response.data.message);

    };

    function tratarMsg(mensagens) {

        setMessages(data => {
            return [
                ...data,
                ...mensagens.map(ele => {
                    return {
                        _id: ele.id,
                        text: ele.text,
                        createdAt: ele.createdAt,
                        user: {
                            _id: ele.sender,
                            name: ele.sender_name,
                            avatar: ele.url
                        }
                    }
                })]
        })

    };

    function enviarMensagem(messages) {
        let receiver = {}
        if(user.id === msg.receiver){
            receiver = { id_receiver: msg.sender, receiver_name: msg.sender_name }
        } else {
            receiver = { id_receiver: msg.receiver, receiver_name: msg.receiver_name }
        }
        
        let MsgObj = {            
            id_message: msg.id_message,
            sender: user.id,
            receiver: receiver.id_receiver,
            receiver_name: receiver.receiver_name,
            text: messages[0].text,
            nome: user.name,
            url: image.url
        }

        socket.emit('sendMessage', MsgObj)

    };

    /*socket.on('returnMsgUser', data => {
        let retunrMsg = [data].map(ele => {
            return {
                _id: ele.id,
                text: ele.text,
                createdAt: ele.createdAt,
                user: {
                    _id: ele.sender,
                    name: ele.nome,
                    avatar: ele.url
                }
            }
        })

        setMessages(...messages,retunrMsg)
    })
    const returnMsg = useCallback((messages = []) => {
        setMessages(oldMessages => [...oldMessages, messages])
    }, [])*/


    useEffect(() => {
        loadPrivateMsg()

        function loadReceiver() {

            if (user.id === msg.receiver) {
                setUserReceiver({ id_receiver: msg.sender, receiver_name: msg.sender_name })
            } else {
                setUserReceiver({ id_receiver: msg.receiver, receiver_name: msg.receiver_name })
            }
            
        }
        loadReceiver()
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))        
        enviarMensagem(messages)
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 15 }}>
                <Text style={styles.header}>{UserReceiver.receiver_name}</Text>
            </View>
            <GiftedChat
                messages={messages}
                placeholder={'Digite uma mensagem'}
                loadEarlier={true}
                onLoadEarlier={loadPrivateMsg}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user.id,
                }}
            />
        </View>


    )
}