
import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop:50,
        backgroundColor:"#FFDEAD"
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10
    },
    headerText:{
        fontSize:15,
        color:'#767380',
        
    },
    headerTextBold:{
        fontWeight:"bold",
    },
    title:{
        fontSize:30,
        marginBottom:16,
        marginTop:48,
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
        padding:24,
        borderRadius:8,
        backgroundColor:'#fff',
        marginBottom:16
    },
    alertProperty:{
       fontSize:14,
       color:'#414d',
       fontWeight:"bold" 
    },
    alertValue:{
        marginTop:8,
        fontSize:15,
        marginBottom:24,
        color:"#737380"
    },
    detailsbutton:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center"
    },
    detailsbuttontext:{
        color:'#e02041',
        fontSize:15,
        fontWeight:"bold"
    },
    safeArea:{
        flex: 1,
    }    
})