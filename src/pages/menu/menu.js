import React from 'react'
import { View, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'


export default function Menu(props) {

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <DrawerItem
            icon={({  size }) => (
              <Icon
                name="home"
                color={'#414d'}
                size={size}
              />
            )}
            label='Home'
            onPress={() => { props.navigation.navigate('perfil') }}
            labelStyle={{fontWeight:"bold",color:'#414d', fontSize:20}}
          />
        </View>

        <View>
          <DrawerItem
            icon={({  size }) => (
              <Icon
                name="exclamation-triangle"
                color={'#414d'}
                size={size}
              />
              )}
            label='Meus Alertas'
            onPress={() => { props.navigation.navigate('MeusAlertas') }}
            labelStyle={{fontWeight:"bold",color:'#414d', fontSize:20}}
          />
        </View>
        <View>
          <DrawerItem
            icon={({  size }) => (
              <Icon
                name="question-circle"
                color={'#414d'}
                size={size}
              />
              )}
            label='Duvidas Frequentes'
            onPress={() => Alert.alert('Página em construção')}
            labelStyle={{fontWeight:"bold",color:'#414d', fontSize:20}}
          />

        </View>
        <View>
          <DrawerItem
            icon={({  size }) => (
              <Icon
                name="lock"
                color={'#414d'}
                size={size}
              />
              )}
            label='Dicas de seguraça'
            onPress={() => Alert.alert('Página em construção')}
            labelStyle={{fontWeight:"bold",color:'#414d', fontSize:20}}
          />
        </View>

        <View>
          <DrawerItem
            icon={({  size }) => (
              <Icon
                name="file"
                color={'#414d'}
                size={size}
              />
              )}
            label='Termos de uso'
            onPress={() => Alert.alert('Página em construção')}
            labelStyle={{fontWeight:"bold",color:'#414d', fontSize:20}}
          />
        </View>

      </DrawerContentScrollView>
      <DrawerItem
        icon={({  size }) => (
          <Icon
            name="sign-out"
            color={'#414d'}
            size={size}
          />
          )}
        label='Sair'
        onPress={() => { }}
        labelStyle={{fontWeight:"bold",color:'#414d', fontSize:20}}
      />

    </View>
  );
}

