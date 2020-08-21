import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'



const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator()


import Perfil from '../pages/perfil';
import NovoAlerta from '../pages/novoAlerta';
import TodosOsAlertas from '../pages/alertas';
import MeusAlertas from '../pages/meusAlertas';
import Detalhes from '../pages/detalhes';
import MinhasInsc from '../pages/minhasInscs';
import FotoPerfil from '../pages/fotoPerfil';
import Inscritos from '../pages/inscritos';
import Ocupacao from '../pages/ocupacao';
import Feedback from '../pages/feedBack';
import Mensagens from '../pages/mensagens';
import Inbox from '../pages/inbox';
import Menu from '../pages/menu/menu'
import {Header, GoBack} from '../pages/menu/Header'


export const Drawers = () => {
    return(
    <AppDrawer.Navigator initialRouteName="perfil"  drawerContent={props => <Menu {...props }/>} >
        <AppDrawer.Screen name='perfil' component={Perfil}/>
        <AppDrawer.Screen name='MeusAlertas' options={{title:'Meus Alertas'} } component={MeusAlertas}/>
    </AppDrawer.Navigator>
    )
}

export const Stacks = ( ) => {
    return(
    <AppStack.Navigator screenOptions={{headerStyle:{backgroundColor:'#414d',elevation:0,shadowColor:'transparent'},headerTintColor:'white',headerTitleAlign:"center" ,
    headerLeft: props =>  <Header {...props} />,
    headerRight:props =>  <GoBack {...props} />  
    }} >
            <AppStack.Screen name='perfil' component={Drawers} options={{title:'Home'}}  />            
            <AppStack.Screen name='todosAlertas' component={TodosOsAlertas} options={{title:'Alertas'}} />
            <AppStack.Screen name='NovoAlerta' component={NovoAlerta} options={{title:'Novo Alerta'}} />                       
            <AppStack.Screen name='detalhes' component={Detalhes} options={{title:'Detalhes'}} />
            <AppStack.Screen name='minhasInsc' component={MinhasInsc} options={{title:'Alertas que estou inscrito'}} />
            <AppStack.Screen name='fotoPerfil' component={FotoPerfil} options={{title:'Minha Foto'}}/>
            <AppStack.Screen name='inscritos' component={Inscritos} options={{title:'Inscritos'}} />            
            <AppStack.Screen name='ocupacao' component={Ocupacao} options={{title:'Minha Profissão'}} />
            <AppStack.Screen name='feedback' component={Feedback} options={{title:'Enviar FeedBack'}} />
            <AppStack.Screen name='inbox' component={Inbox} options={{title:'Mensagens'}} />
            <AppStack.Screen name='Mensagens' component={Mensagens} options={{title:'Mensagens'}} />          
        </AppStack.Navigator>
    )
};

