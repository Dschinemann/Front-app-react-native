import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:50,
        backgroundColor:"#FFFFE0"
    },
    alertContainer:{
        alignSelf:"center",
        backgroundColor:"#FFDEAD",
        flexDirection:"row",
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        height:30, 
    },
    alertProperty:{        
        fontSize:20,
        color:'#414d',
        fontWeight:"bold",       
        paddingLeft:10,
        paddingRight:10,
        padding:3,
    },
    alertValue:{   
        fontSize:20,
        color:"#737380",
        fontWeight:"bold",
        padding:3,    
    },
    alert:{
        padding:10,
        borderRadius:8,
        backgroundColor:'#fff',
        marginBottom:10
    },
    alertPropertyName:{
        fontSize:14,
        color:'#414d',
        fontWeight:"bold",
        padding:5
    },
    textArea:{
        borderWidth:1,
        borderRadius:5,
        padding:8,
    },
    finalizar:{
        fontSize:20,
        color:'#414d',
        fontWeight:"bold",
        padding:5
    }

})
