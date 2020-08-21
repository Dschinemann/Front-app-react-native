import React, { useState, useEffect,useContext } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import styles from './styles'
import api from '../../services/api'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation} from '@react-navigation/native'
import AuthContext from '../../context/auth'



export default function Alertas() {
   
    const { user } = useContext(AuthContext);
    const [alertas, setAlertas] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
    };

    

    async function loadAlerts() {

        const response = await api.post(`/alert/${user.id}/allAlerts?page=${page}`)
        setAlertas([...alertas, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
    }
    function navegarInscritos(alert) {
        navigation.navigate('inscritos', { alert })
    }

    async function deleteAlerts(alert_id) {
        
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
        navigation.navigate('feedback', { alert })
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

    useEffect(() => {
        loadAlerts()
    }, [])
    

    return (

        <View style={styles.container}>            
            <Text style={styles.description}>Estes são os Alertas que você cadastrou!</Text>

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
                                    <Text style={styles.idAlert}>Código:</Text>
                                    <Text style={styles.alertValue}>{alert.id}</Text>

                                    <Text style={styles.idAlert}>Status</Text>
                                    <Text style={styles.alertValue}>{alert.status}</Text>

                                </View>
                                <Text style={styles.alertProperty}>Titulo:</Text>
                                <Text style={styles.alertValue}>{alert.titulo}</Text>

                                <Text style={styles.alertProperty}>Descrição:</Text>
                                <Text style={styles.alertValue}>{alert.descricao}</Text>

                                <Text style={styles.alertProperty}>Valor:</Text>
                                <Text style={styles.alertValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alert.valor)}</Text>
                                
                                <Text style={styles.alertProperty}>Inserido em:</Text>
                                <Text style={styles.alertValue} >{Intl.DateTimeFormat('pt-BR', options).format(new Date(alert.createdAt))}</Text>

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