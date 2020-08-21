import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,        
        backgroundColor:"#FFFFE0"
    },
    inputs:{
        backgroundColor:'white',
        borderBottomWidth:3,
        borderLeftWidth:4,
        borderColor:'black',
        color:'black',
        fontSize:20,
        fontWeight:"bold",
        padding:10,
        borderRadius:5
    },
    header:{
        color:'#414d',
        fontWeight:"bold",
        fontSize:20,
        alignSelf:'center',
        padding:10
        
    },
    multiselect:{
        marginTop:5,
        paddingTop:5,
        borderBottomWidth:3,
        borderLeftWidth:4,
        borderColor:'black',
        borderRadius:5
        
    },
    local:{
        color:'#414d',
        fontWeight:"bold",
        fontSize:20,       
        alignSelf:'center',
        marginTop:20,
        
    },
    viewLocal:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:"center",
        borderBottomWidth:3,
        borderColor:'black',
                
    },
    button:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',        
        backgroundColor:'#414d',
        borderRadius:10,
        width:200,
        height:50,      
        textAlign:"center",
        marginTop:20,                 
    },
    inputContainer:{
        padding:8
    }
})