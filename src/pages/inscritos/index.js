import React, { useState, useEffect,useContext } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Linking, Alert } from 'react-native'
import styles from './styles'
import { Avatar, Rating } from 'react-native-elements'
import { useRoute, useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/FontAwesome'
import api from '../../services/api'
import AuthContext from '../../context/auth'




export default function Inscritos() {    
    const [inscs, setInscs] = useState([])
    const [total, setTotal] = useState(0)
    const [checkboxes, setChecked] = useState([])
    const [page, setPage] = useState(1)
    const route = useRoute()
    const alert = route.params.alert
    const navigation = useNavigation()
    const { user } = useContext(AuthContext);
    
    

    async function loadIncs() {
        const response = await api.get(`/alert/${alert.id}/allAlerts/myinsc?page=${page}`)             
        setInscs([...inscs,...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
    }

    
    
    function voltar() {
        navigation.goBack()
    }

    function openWhats(telefone) {
        Linking.canOpenURL(`whatsapp://send?text=oi`).then(supported => {
            if (supported) {
                return Linking.openURL(`whatsapp://send?phone=55${telefone}&text=Olá`)
            } else {
                return Linking.openURL(
                    `https://api.whatsapp.com/send?phone=55${telefone}9&text=Olá`)
            }
        })
    }
    function call(telefone) {
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${telefone}`
        } else {
            phoneNumber = `telprompt:${telefone}`
        }
        Linking.canOpenURL(phoneNumber).then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available')
            } else {
                return Linking.openURL(phoneNumber)
            }
        })
    }

    function email(email) {
        Linking.canOpenURL(`mailto:${email}`).then(supported => {
            if (supported) {
                return Linking.openURL(`mailto:${email}?subject=${alert.titulo}`)
            }
        })
    }
    
    async function checkThisBox(i,id) {
        setChecked({
            ...checkboxes,
            [i]: !checkboxes[i]
        })
        enviarSelecao(i,id)
        
    }

    async function enviarSelecao(i,id){
        
        const verificarStatus = inscs[i]    

        if(verificarStatus.selecao == 'true'){
            inscs[i].selecao = 'false'
        } else 
            inscs[i].selecao = 'true'       
        
        try {
            const response = await api.put(`/alert/${id}/insc`,{
                selecao:inscs[i].selecao,
                user_id_insc:inscs[i].user_id
            })
            const mensagem = await api.post('/conversation',{
                user_id_selecao:inscs[i].user_id,
                receiver_name:inscs[i].name,
                nome:user.name,
                url:inscs[i].url
            })
        } catch (error) {
           
            Alert.alert('não selecionado!')
        }

        inscs.splice(i,1)        
        loadIncs()
        setChecked(!checkboxes[i])
        
    }


    useEffect(() => {
        loadIncs()         
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>   Abaixo temos {total} inscrito(s) para o Alerta que você criou, agora escolhas quantos você precisa,
            e não esqueça de classifica-los para que outras pessoas possam ter referencias do canditado! </Text>
            <View style={{ flexDirection: "row", padding: 5, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={voltar}>
                    <Icon
                        name='long-arrow-left'
                        color={"red"}
                        size={30}
                    />
                </TouchableOpacity>

                <Text style={{ fontSize: 20, marginLeft: 20, color: 'red' }}>Voltar</Text>

            </View>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <FlatList                                               
                        data={inscs}                        
                        keyExtractor={insc => String(insc.id)}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadIncs}
                        onEndReachedThreshold={0.2}                      
                        renderItem={({ item: insc, index }) => (
                            <View style={styles.alert}>

                                <Text style={styles.alertPropertyName}>{insc.name}</Text>
                                <Avatar
                                    source={{
                                        uri: insc.url
                                            ? insc.url
                                            : 'https://th.bing.com/th/id/OIP.ehFdDj_opqs8MF9a7I5DfgHaHa?w=209&h=199&c=7&o=5&pid=1.7'
                                    }}
                                    rounded={true}
                                    size="large"
                                />

                                <Rating
                                    ratingBackgroundColor="#000"
                                    count={5}
                                    reviews={false}
                                    imageSize={30}
                                    ratingCount={5}
                                    readonly={true}
                                    startingValue={insc.rating}
                                />
                                <View style={styles.containerContato}>
                                    <TouchableOpacity onPress={() => { }} style={{ padding: 8 }}>
                                        <Text style={styles.alertProperty}>Baixar Curriculum</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <CheckBox
                                    value={checkboxes[index]}
                                    onValueChange={() => checkThisBox(index,insc.alert_id)}                                    
                                    />
                                    <TouchableOpacity onPress={() => checkThisBox(index)}>
                                        <Text style={styles.selecao}>Selecionar</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.containerIcons}>
                                    <TouchableOpacity onPress={() => openWhats(insc.telefone)} >
                                        <Icon
                                            style={styles.icons}
                                            size={25}
                                            color={'green'}
                                            name='whatsapp' />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => call(insc.telefone)} >
                                        <Icon
                                            style={styles.icons}
                                            size={25}
                                            color={'blue'}
                                            name='phone'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => email(insc.email)} >
                                        <Icon
                                            style={styles.icons}
                                            size={25}
                                            color={'red'}
                                            name='envelope'
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )}
                    />

                </View>
            </SafeAreaView>
        </View>
    )

}