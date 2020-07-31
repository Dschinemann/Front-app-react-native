import { StyleSheet } from 'react-native'



export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:"#6495ED"

    },
    containerText: {
        flex: 1,
        justifyContent: "center",        
    },
    text: {
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor:"#0000FF",
        fontSize:20,
        fontWeight:"bold",
        color:'white',
        height:'auto',
        margin:10,
        padding:10,
        textAlign:"center",
        borderBottomColor:'white',
        borderColor:'white'
    },
    textHeader:{
        fontSize:30,
        fontWeight:"bold",
        color:'white',
        padding:15           
    },
    containerAvatar:{      
        flexDirection:"row",
        alignSelf:'flex-start',
        paddingLeft:25,
                 
    },
    textAvatar:{
        color:'white',
        fontWeight:"bold",
        paddingLeft:15,
        fontSize:20,                  
    },
})