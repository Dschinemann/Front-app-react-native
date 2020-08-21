import { StyleSheet } from 'react-native'



export default StyleSheet.create({
    container: {
        flex: 2,
        alignItems: "center",
        backgroundColor:"#FFFFE0"

    },
    containerText: {
        flex: 1,
        justifyContent: "center",        
    },
    text: {                
        fontSize:20,
        fontWeight:"bold",
        color:'#414d',
        height:'auto',
        margin:10,
        padding:10,
        textAlign:"justify",        
        borderLeftWidth:3,
        borderBottomWidth:3,
        borderRadius:5,
        borderColor:'#1C1C1C'
    },
    textHeader:{
        fontSize:30,
        fontWeight:"bold",
        color:'#414d',
        padding:15,
         
    },
    containerAvatar:{      
        flexDirection:"row",
        alignSelf:'flex-start',
        paddingLeft:5,
                 
    },
    textAvatar:{
        color:'#414d',
        fontWeight:"bold",
        paddingLeft:10,
        fontSize:20,                  
    },
    header:{                
        alignSelf:'center',
        paddingLeft:5,
    },

})