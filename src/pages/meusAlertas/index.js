import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import styles from './styles'
import api from '../../services/api'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation} from '@react-navigation/native'



export default function Alertas() {
   
    
    const [alertas, setAlertas] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()

    

    async function loadAlerts() {

        const userId = await AsyncStorage.getItem('@user_user_id')
        const response = await api.post(`/alert/${userId}/allAlerts?page=${page}`)
        setAlertas([...alertas, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
    }
    function navegarInscritos(alert) {
        navigation.navigate('inscritos', { alert })
    }

    async function deleteAlerts(alert_id) {
        const userId = await AsyncStorage.getItem('@user_user_id')
        const indice = alertas.findIndex(obj => obj.id == alert_id)
        alertas.splice(indice, 1)
        try {
            const response = await api.delete(`/alert/${alert_id}/alertaDel`)
            Alert.alert(response.data)
        } catch (error) {
            Alert.alert('Erro ao enviar Dados')
            
        }
        loadAlerts()
    }



    function feedBack(alert) {
        navigation.navigate('feedBack', { alert })
    }


    function aviso(alert_id) {
        Alert.alert(
            "Aviso!",
            'Deseja mesmo deletar este Alerta?',
            [
                {
                    text: "Cancel",
                    onPress: () => loadAlerts(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteAlerts(alert_id) }
            ],
            { cancelable: false }
        );
    }
    function voltar(){
        navigation.navigate('perfil')
    }

    useEffect(() => {
        loadAlerts()
    }, [])
    

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Estes são os Alertas que você cadastrou!</Text>
            <TouchableOpacity onPress={voltar}>                
                    <Icon
                    name='long-arrow-left'                    
                    color={"red"}
                    size={30}          
                    />
            </TouchableOpacity>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <FlatList
                        data={alertas}
                        keyExtractor={alert => String(alert.id)}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadAlerts}
                        onEndReachedThreshold={0.2}
                        renderItem={({ item: alert }) => (
                            <View style={styles.alert}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Text style={styles.idAlert}>ID Alert:</Text>
                                    <Text style={styles.alertValue}>{alert.id}</Text>

                                    <Text style={styles.idAlert}>Status</Text>
                                    <Text style={styles.alertValue}>{alert.status}</Text>

                                </View>
                                <Text style={styles.alertProperty}>Titulo:</Text>
                                <Text style={styles.alertValue}>{alert.titulo}</Text>

                                <Text style={styles.alertProperty}>Descrição:</Text>
                                <Text style={styles.description}>{alert.descricao}</Text>

                                <Text style={styles.alertProperty}>Valor:</Text>
                                <Text style={styles.alertValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alert.valor)}</Text>
                                <View>
                                    { alert.status != 'inativo' &&  <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", padding: 10 }}>                                 
                                    <TouchableOpacity onPress={() => navegarInscritos(alert)}>
                                        <Text style={styles.alertProperty}>Inscritos nesse Alerta</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => feedBack(alert)}>
                                        <Text style={styles.alertProperty}>Fechar Alerta</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignSelf: "flex-end", }}
                                        onPress={() => aviso(alert.id)} >
                                        <Icon
                                            size={20}
                                            color={'red'}
                                            name='trash'
                                        />
                                    </TouchableOpacity>

                                </View> }
                                </View>


                            </View>
                        )}
                    />

                </View>
            </SafeAreaView>
        </View>

    )

}