import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRoute, Alert } from '@react-navigation/native'
import styles from './styles'
import api from '../../services/api'
import AuthContext from '../../context/auth'

export default function Detalhes() {
    const route = useRoute()
    const alert = route.params.alert
    const { user } = useContext(AuthContext);
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,         
      };
    

    async function insc() {
        try {
            const response = await api.post(`/alert/${alert.id}/allAlerts/insc`, {
                titulo: 'titulo'

            })
            Alert.alert(
                'Aviso',
                `${response.data}`,
                [
                    { text: 'OK', onPress: () => { } }
                ]

            )
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.alert}>

                <Text style={styles.alertProperty}>Titulo:  <Text style={styles.alertValue}>
                    {alert.titulo}</Text>
                </Text>
                <Text style={styles.alertProperty}>Descrição:  <Text style={styles.alertValue}>
                    {alert.descricao}</Text>
                </Text>
                <Text style={styles.alertProperty}>Valor:  <Text style={styles.alertValue}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alert.valor)}</Text>
                </Text>
                <Text style={styles.alertProperty}>Local:  <Text style={styles.alertValue}>
                    {alert.local}</Text>
                </Text>
                <Text style={styles.alertProperty}>Inserido em:  <Text style={styles.alertValue}>
                    {Intl.DateTimeFormat('pt-BR', options).format(new Date(alert.createdAt))}</Text>
                </Text>
                <View>{
                    alert.user_id == user.id
                        ? <View></View>
                        :
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={insc}>
                            <Text style={styles.alertProperty}>Inscreva-se</Text>
                        </TouchableOpacity>

                }</View>


            </View>
        </View>
    )

}