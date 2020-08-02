import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:50,
        backgroundColor:"#FFFFE0"
    },
    description:{
        fontSize:16,
        lineHeight:24,
        color:'#737380',
        paddingBottom:10

    },
    alert:{
        padding:24,
        borderRadius:8,
        backgroundColor:'#fff',
        marginBottom:16
    },
    alertProperty:{
       fontSize:18,
       color:'#414d',
       fontWeight:"bold",
    },
    alertValue:{
        marginTop:8,
        fontSize:18,
        marginBottom:24,
        color:"#737380"
    },   
})
