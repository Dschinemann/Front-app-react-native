import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:0,
        backgroundColor:"#FFFFE0"            
    },   
    title:{
        fontSize:30,
        marginBottom:0,
        marginTop:10,
        color:'#13131a',
        fontWeight:"bold"
    },
    description:{
        fontSize:16,
        lineHeight:24,
        color:'#737380',
        paddingBottom:10

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
       fontWeight:"bold",       
    },
    alertValue:{
        marginTop:8,
        fontSize:15,       
        color:"#737380"
    },
    safeArea:{
        flex: 1,
    },
    containerContato:{
        flex:1,
        
    },
    alertPropertyName:{
        fontSize:14,
        color:'#414d',
        fontWeight:"bold",
        padding:5
    },
    containerIcons:{
        flex:1,
        flexDirection:"row",
        justifyContent:'center'
    },
    icons:{
        margin:10
    },
    selecao:{
        paddingStart:10,
        color:'#414d',
        fontWeight:"bold",
        paddingTop:5
    }

})