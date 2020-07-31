import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:25,
        backgroundColor:"white",          
    },
    nome:{
        fontSize:20,
        fontWeight:"bold"
    },
    msgText:{
        fontSize:20,
        fontWeight:"bold",        
    },
    header:{
        padding:10
    },
    msgTextSender:{
        alignSelf:'flex-end',
        fontSize:20,
        fontWeight:"bold",
        paddingLeft:5,
        color:'white'
    },
    senderMessage:{
        backgroundColor:'blue',
        borderRadius:5,
        alignSelf:"flex-end",
        padding:5,        
    }

})
