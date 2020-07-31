import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:25,
        backgroundColor:"#4169E1"        
    },
    textInput:{        
        position: 'absolute',
        left: 5,
        right: 5,
        bottom: 5,
        backgroundColor: 'white',
        borderRadius:5,
    },
    msg:{
        flex:1,
        padding:10,
        borderRadius:8,
        backgroundColor:'#fff',
        marginBottom:16,        
    },
    text:{
        fontSize:15,
        fontWeight:"bold",
        color:'white',
        padding:20,
    },
    nome:{
     fontSize:15,
     fontWeight:"bold"   
    },
    mensagemText:{
        padding:10,
        fontSize:15,
        fontWeight:"normal"

    },

})