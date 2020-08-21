import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput,ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AirbnbRating } from 'react-native-ratings'
import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Api from '../../services/api'


export default function Feedback() {
    const route = useRoute()
    const navigate = useNavigation()
    const [page, setPage] = useState(1)
    const alert = route.params.alert       
    const [inscritos, setInscritos] = useState([])
    const [total, setTotal] = useState(0)
    const [nota, setNota] = useState(0)
    const [feedback, setFeedBack] = useState('')
    const [loading, setLoading]=useState(false)

    async function loadInscritos() {

        try {
            const response = await Api.get(`/alert/${alert.id}/allAlerts/myinsc?page=${page}&status=${true}&avaliado=${'NAO'}`)
            
            setInscritos([...inscritos,...response.data])
            setPage(page + 1)
            setTotal(response.headers['x-total-count'])


        } catch (error) {
            Alert.alert('Erro, tente novamente')
        }
    }

    async function enviarFeedBack(insc, index) {
        setLoading(true)
        try {

            const response = await Api.post(`/user/alert/feedback?alert_id=${insc.alert_id}`, {
                user_id_avaliado: insc.user_id,
                nota,
                feedback,
                avaliado: 'SIM'
            })

            setLoading(false)
        } catch (error) {

            Alert.alert('Tente novamente!')
        }
        inscritos.splice(index, 1)
        loadInscritos()

    }
    async function finalizar(alert) {
        setLoading(true)
        try {
            await Api.put(`/alert/${alert.id}/allAlerts/insc`)
            navigate.navigate('MeusAlertas')
            setLoading(false)
        } catch (error) {

        }

    }


    function finalizarAlerta(alert) {

        Alert.alert(
            'Aviso',
            'Finalizando o alerta você não podera mais atualiza-lo e também não podera avaliar os profissionais que executaram sua tarefa, se não avaliou todos eles, cancele a operaçao e classifique-os, seu feedback é importante!',
            [

                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel'
                },
                { text: 'Finalizar', onPress: () => finalizar(alert) }
            ]

        )

    }

    useEffect(() => {
        loadInscritos()
    }, [])

    return (
        <View style={styles.container}>
                <View>
                    <ActivityIndicator animating={loading} size="large" color="#999" />
                </View>
            <View style={styles.alertContainer}>
                <Text style={styles.alertProperty}>Código:   <Text style={styles.alertValue}>
                    {alert.id}</Text>
                </Text>
                <Text style={styles.alertProperty}>Titulo:     <Text style={styles.alertValue}>
                    {alert.titulo}</Text>
                </Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity onPress={() => finalizarAlerta(alert)} style={{ padding: 15, paddingRight: 15 }}>
                    <Text style={styles.finalizar}>Finalizar Alerta</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <SafeAreaView>
                    <View >
                        <FlatList
                            data={inscritos}
                            keyExtractor={insc => String(insc.id)}
                            showsVerticalScrollIndicator={false}
                            onEndReached={loadInscritos}
                            onEndReachedThreshold={0.2}
                            renderItem={({ item: insc, index }) => (
                                <View style={styles.alert}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.alertPropertyName}>{insc.name}</Text>
                                        <AirbnbRating
                                            isDisabled={true}
                                            size={20}
                                            showRating={false}
                                            defaultRating={insc.rating}
                                            onFinishRating={() => { }}
                                        />
                                    </View>
                                    <Avatar
                                        source={{
                                            uri: insc.url
                                                ? insc.url
                                                : 'https://th.bing.com/th/id/OIP.ehFdDj_opqs8MF9a7I5DfgHaHa?w=209&h=199&c=7&o=5&pid=1.7'
                                        }}
                                        rounded={true}
                                        size="large"
                                    />
                                    <TextInput
                                        multiline={true}
                                        textAlign={'left'}
                                        placeholder={'Escreva o que você achou desse profissional, mas lembre-se que é uma mensagem publica, outros usuários como você poderão visualizar, então seja etico e educado! '}
                                        style={styles.textArea}
                                        autoCorrect={false}
                                        onChangeText={(val) => setFeedBack(val)}
                                    />

                                    <AirbnbRating
                                        showRating={false}
                                        defaultRating={0}
                                        onFinishRating={(val) => setNota(val)}
                                    />

                                    <View style={styles.containerContato}>
                                        <TouchableOpacity onPress={() => enviarFeedBack(insc, index)} style={{ padding: 8 }}>
                                            <Text style={styles.alertPropertyName} >Enviar avaliação</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </SafeAreaView>
            </View>

        </View>
    )

}