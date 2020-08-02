import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { useNavigation,useRoute } from '@react-navigation/native'
import styles from './styles'
import api from '../../services/api'




export default function Alertas() {
    const route = useRoute()
    const [alertas, setAlertas] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const ocupacao = route.params.ocupacao
    
    const navigation = useNavigation()

    async function loadAlerts() {
        if(ocupacao == null){
                    
            return Alert.alert(
                'Aviso',
                'Selecione sua profissão e atualize seu cadastro, ou, se você ja fez isso, reinicie o app ou retorne a página!',
                [

                    { text: 'ok', onPress: () => {}}
                ]
    
            )
        }

        const response = await api.get(`/alert/allAlerts?page=${page}&search=${ocupacao}`)

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
                <Text style={styles.headerTextBold}>Temos um Total de {total}  Alertas para seu perfil</Text>
            </View>
            <Text style={styles.description}>Quais as oportunidades para hoje?</Text>

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
                               
                                <Text style={styles.alertProperty}>Código:   <Text style={styles.alertValue}>
                                    {alert.id}</Text>
                                </Text>
                                <Text style={styles.alertProperty}>Titulo:     <Text style={styles.alertValue}>
                                    {alert.titulo}</Text>
                                </Text>
                                <Text style={styles.alertProperty}>Valor:      <Text style={styles.alertValue}>
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alert.valor)}</Text>
                                </Text>                                
                                <TouchableOpacity style={{marginTop:10}} onPress={() => irParaDetalhes(alert)}>
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