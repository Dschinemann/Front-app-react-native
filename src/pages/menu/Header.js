import React, {useState, useEffect} from 'react'
import { View , TouchableOpacity} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer'
import Bars from 'react-native-vector-icons/FontAwesome'
import { useNavigation, DrawerActions } from '@react-navigation/native';

export function Header() {
    const navigate = useNavigation()
    const [select, setSelect] = useState(false)
    
    function togleDrawer(){      
      let togle = !select
      
      if(togle){
        navigate.dispatch(DrawerActions.openDrawer())
      } else {
        navigate.dispatch(DrawerActions.closeDrawer())
      }
      
      setSelect(togle)
    }
       
    return (
      <View>          
        <DrawerItem
          icon={() => (
            <Bars
              name='bars'
              color={"white"}
              size={30} 
            /> 
          )}
          label=''
          onPress={() => togleDrawer()}          
        />
      </View>
    )
}
export function GoBack(){
  const navigate = useNavigation()
  return (
    <View>
           
      <TouchableOpacity
      onPress={() => navigate.goBack()}
      style={{paddingRight:15}}>               
          <Bars
            name='arrow-circle-left'
            color={'white'}
            size={30}            
          /> 
        </TouchableOpacity>


    </View>
  )
}
