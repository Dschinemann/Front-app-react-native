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

function Drawers(){
    return(
    <AppDrawer.Navigator initialRouteName="perfil">
        <AppDrawer.Screen name='perfil' component={Perfil}/>
        <AppDrawer.Screen name='MeusAlertas' component={MeusAlertas}/>
    </AppDrawer.Navigator>
    )
}

const Stacks = () => {
    return(
        <AppStack.Navigator  screenOptions={{ headerShown: false }}>
             <AppStack.Screen name='perfil' component={Drawers} />
            <AppStack.Screen name='todosAlertas' component={TodosOsAlertas} />
            <AppStack.Screen name='NovoAlerta' component={NovoAlerta} />                       
            <AppStack.Screen name='detalhes' component={Detalhes} />
            <AppStack.Screen name='minhasInsc' component={MinhasInsc} />
            <AppStack.Screen name='fotoPerfil' component={FotoPerfil} />
            <AppStack.Screen name='inscritos' component={Inscritos} />            
            <AppStack.Screen name='ocupacao' component={Ocupacao} />
            <AppStack.Screen name='feedback' component={Feedback} />
            <AppStack.Screen name='inbox' component={Inbox} />
            <AppStack.Screen name='Mensagens' component={Mensagens} />          
        </AppStack.Navigator>
    )
};

export default Stacks