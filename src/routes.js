import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Login from './pages/login'
import CreateUser from './pages/cadastro'
import Perfil from './pages/perfil'
import NovoAlerta from './pages/novoAlerta'
import TodosOsAlertas from './pages/alertas'
import MeusAlertas from './pages/meusAlertas'
import Detalhes from './pages/detalhes'
import MinhasInsc from './pages/minhasInscs'
import FotoPerfil from './pages/fotoPerfil'
import Inscritos from './pages/inscritos'
import Ocupacao from './pages/ocupacao'
import Feedback from './pages/feedBack'
import Mensagens from './pages/mensagens'
import Inbox from './pages/inbox'

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                
                <AppStack.Screen name='login' component={Login}/>
                <AppStack.Screen name='createUser' component={CreateUser}/>
                <AppStack.Screen name='perfil' component={Perfil}/>
                <AppStack.Screen name='novoAlerta' component={NovoAlerta}/>
                <AppStack.Screen name='todosAlertas' component={TodosOsAlertas}/>
                <AppStack.Screen name='meusAlertas' component={MeusAlertas}/>
                <AppStack.Screen name='detalhes' component={Detalhes}/>
                <AppStack.Screen name='minhasInsc' component={MinhasInsc}/>
                <AppStack.Screen name='minhaFoto' component={FotoPerfil}/>
                <AppStack.Screen name='inscritos' component={Inscritos}/>
                <AppStack.Screen name='ocupacao' component={Ocupacao}/>
                <AppStack.Screen name='feedBack' component={Feedback}/>
                <AppStack.Screen name='mensagens' component={Mensagens}/>
                <AppStack.Screen name='inbox' component={Inbox}/>

            </AppStack.Navigator>
        </NavigationContainer>
    )
}
