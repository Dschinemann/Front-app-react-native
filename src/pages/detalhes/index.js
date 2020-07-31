import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import api from '../../services/api'
import { Alert } from 'react-native'

export default function Detalhes() {
    const route = useRoute()
    const alert = route.params.alert

    async function insc() {
        try {
            const response = await api.post(`/alert/${alert.id}/allAlerts/insc`, {
                titulo: 'titulo'

            })
            Alert.alert(
                'Aviso',
                `${response.data}`,
                [
                   { text: 'OK', onPress: () => {} }
                ]
    
            )
        } catch (error) {
           
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.alert}>
                <Text style={styles.alertProperty}>ID Alert:</Text>
                <Text style={styles.alertValue}>{alert.id}</Text>

                <Text style={styles.alertProperty}>Titulo:</Text>
                <Text style={styles.alertValue}>{alert.titulo}</Text>

                <Text style={styles.alertProperty}>Valor:</Text>
                <Text style={styles.alertValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alert.valor)}</Text>

                <Text style={styles.alertProperty}>Local:</Text>
                <Text style={styles.alertValue}>{alert.local}</Text>

                <TouchableOpacity onPress={insc}>
                    <Text style={styles.alertProperty}>Inscreva-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}