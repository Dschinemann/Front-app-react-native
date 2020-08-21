import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements'
import styles from './styles'
import ImagePicker from 'react-native-image-picker'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'



export default function FotoPerfil() {
        const [image, setImage] = useState(null)
        const [loading, setLoading]=useState(false)
        const navigation = useNavigation()

        const options = {
            title: 'Selecione uma Imagem da sua galeria',
            takePhotoButtonTitle: "Tirar uma Foto?",
            chooseFromLibraryButtonTitle: "Escolha uma foto de sua galeria!",
            maxWidth: 1024,
            maxHeight: 980
        }


        function imagePickerCallBack(data) {
            if (data.didCancel) {
                return
            }
            if (data.error) {
                return
            }
            if (!data.uri) {
                return
            }
            setImage(data)
        }

        async function Upload() {
            setLoading(true)
            const data = new FormData()
            data.append('file',{
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            })
                                                  
            
           try {
            const response = await api.post(`/user/uploadFoto`,data,{
                headers:{
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`
                }
            })
            setLoading(false)    
            Alert.alert(response.data)
            navigation.navigate('perfil')
            } catch (error) {
                
                Alert.alert('tente novamente') 
            }
        }

        async function updateFoto(){
            setLoading(true)
            const data = new FormData()
            data.append('file',{
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            })

            try {
                const response = await api.put(`/user/uploadFoto`,data,{
                    headers:{
                        "Content-Type": `multipart/form-data; boundary=${data._boundary}`
                    }
                })
                setLoading(false)    
                Alert.alert(response.data)
                navigation.navigate('perfil')
                } catch (error) {
                    
                    Alert.alert('tente novamente') 
                }
        }

        return (
            <View style={styles.container}>
                <View>
                    <ActivityIndicator animating={loading} size="large" color="#999" />
                </View>
                
                <View style={styles.containerAvatar}>
                    <TouchableOpacity onPress={() => ImagePicker.showImagePicker(options, imagePickerCallBack)}>
                        <Avatar
                            size={"large"}
                            source={{
                                uri: image
                                    ? image.uri
                                    : 'https://th.bing.com/th/id/OIP.ehFdDj_opqs8MF9a7I5DfgHaHa?w=209&h=199&c=7&o=5&pid=1.7'
                            }}
                            rounded={true}
                            size={200}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textInfom}>Toque na imagem para selecionar uma foto de exibição!</Text>

                    <TouchableOpacity onPress={Upload}>
                        <Text style={styles.textAvatar}>Enviar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={updateFoto}>
                        <Text style={styles.textAvatar}>Atualizar Foto</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )

}