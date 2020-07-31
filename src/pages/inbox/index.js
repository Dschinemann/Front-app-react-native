import React, { useState, useEffect, useCallback } from 'react'
import { View, SafeAreaView, FlatList, Text, TextInput,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import socket from '../../services/socket'
import styles from './styles'




export default function Inbox() {

  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [receiver, setReceiver] = useState(1)
  const [messageUser, setMessageUser] = useState([])
  const [refreshing, setRefreshing] = useState(false)  
  const [user, setUserId] = useState()
  

  const routes = useRoute()
  const msg = routes.params.msg

  async function loadPrivateMsg() {
    const response = await api.get(`/conversation/index?page=${page}`)
    setMessages([...messages, ...response.data].sort((a,b) => a.createdAt > b.createdAt))
    setPage(page + 1)
    setRefreshing(false)
  }
  
  function tratarMensagem(mensagem) {
    const hash = Math.random()
    const id = Math.floor(hash*5898)
   
    if(mensagem === ''){
      setMessageUser([])
    }else {
    const msgObjOrg = {
      id,
      createdAt:new Date(), 
      id_message: msg.id_message,
      sender: user,
      receiver,
      text: mensagem,      
    }
    
    setMessageUser(msgObjOrg)
  }
  }

  function resfresh(){
    setRefreshing(true)
    loadPrivateMsg()
  }

  async function loadId() {
    const user_id = JSON.parse(await AsyncStorage.getItem('@user_user_id'))
    setUserId(user_id)

    if(msg.sender === user_id){
      setReceiver(msg.receiver)
    } else {
      setReceiver(msg.sender)
    }
  
  }
  socket.emit('users',{
    user,
    socketId:socket.id,      
  })   

  useEffect(() => {
    loadPrivateMsg()
    loadId()
  
  }, [])


  function enviarMsg() {

    socket.emit('sendMessage', messageUser)

    socket.emit('envMsg',{
      messageUser:messageUser,
      receiver
    })
    setMessages([...messages, messageUser])
    setMessageUser([])
            
  }

  socket.on('returnMsg', data => {
    setMessages([...messages, data])       
  })

  socket.on('returnMsgUser', data =>{
    
    const hash = Math.random()
    const id = Math.floor(hash*5898)

    const novoObjeto = {
      id:id,
      createdAt:new Date(),     
      id_message: msg.id_message,
      sender: user,
      receiver,
      text: data,
    }
    
    setMessages([...messages, novoObjeto ])

  })
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nome}>Nome</Text>
      </View>
      <View style={{ flex: 1, }}>
        <SafeAreaView style={{ backgroundColor: 'white', borderRadius: 10 }}>
          <FlatList
            data={messages}
            keyExtractor={msg => String(msg.id)}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={resfresh}
            renderItem={({ item: msgs }) => (
              <View >
                {
                  msgs.sender == user && <View style={styles.senderMessage}>
                    <Text style={styles.msgTextSender}>{msgs.text}</Text>
                  </View>

                }
                {
                  msgs.sender != user && <View>
                    <Text style={styles.msgText}>{msgs.text}</Text>
                  </View>

                }
              </View>
            )}
          />
        </SafeAreaView>
      </View>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
        <TextInput
          value={messageUser.text}         
          onChangeText={(val) => tratarMensagem(val)}
          placeholder={'Digite sua mensagem'}
        />
        {messageUser.length != 0  &&        
          <View>
            <TouchableOpacity onPress={enviarMsg}>
              <Icon
                name='send'
                color={"black"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>

  )
}