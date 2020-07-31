import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation} from '@react-navigation/native'
import styles from './styles'
import api from '../../services/api'


export default function Alertas() {
    const [alertas, setAlertas] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
   

    const navigation = useNavigation()


    async function loadAlerts() {


        const response = await api.get('/alert/allAlerts/insc', {
            params: { page }
        })
      
        console.log(response.data)
        setAlertas([...alertas, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
    }

    useEffect(() => {
        loadAlerts()
    }, [])

    function irParaDetalhes(alert) {
        navigation.navigate('detalhes', { alert })
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Você se inscreveu para {total} Alertas</Text>
            </View>
           
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.alertlist}>
                    <FlatList style={styles.alertList}
                        data={alertas}
                        keyExtractor={alert => String(alert.id)}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadAlerts}
                        onEndReachedThreshold={0.2}
                        renderItem={({ item: alert }) => (
                            <View style={styles.alert}>
                                <Text style={styles.alertProperty}>ID Alert:</Text>
                                <Text style={styles.alertValue}>{alert.id}</Text>

                                <Text style={styles.alertProperty}>Titulo:</Text>
                                <Text style={styles.alertValue}>{alert.titulo}</Text>

                                <Text style={styles.alertProperty}>Valor:</Text>
                                <Text style={styles.alertValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alert.valor)}</Text>
                                
                                <TouchableOpacity onPress={() => irParaDetalhes(alert)}>
                                    <Text style={styles.alertProperty}>Detalhes desse Alerta</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </View>

    )

}