import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:0,
        backgroundColor:"#FFFFE0"
    },   

    description:{
        fontSize:16,
        lineHeight:24,
        color:'#737380',
        fontWeight:"bold",
        paddingBottom:10,
        marginTop:10,

    },
    alert:{
        padding:10,
        borderRadius:8,
        backgroundColor:'#fff',
        marginBottom:10
    },
    alertProperty:{
       fontSize:14,
       color:'#414d',
       fontWeight:"bold" 
    },
    alertValue:{
        marginTop:8,
        fontSize:15,       
        color:"#737380",
        fontWeight:"bold",
    },
    safeArea:{
        flex: 1,
    },
    idAlert:{
        padding:10,
        color:'#414d',
        fontWeight:'bold'
    },


})