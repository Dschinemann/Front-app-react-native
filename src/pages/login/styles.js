import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#FFFFE0"
    },
    inputs:{
        borderColor:"gray",
        borderWidth:1,
        height:40,
        width:300,
        borderRadius:10        
    },
    containerButton:{
        padding:10,    
        borderBottomWidth:2,

    },
    containerInputs:{
        padding:5
    },
    title:{
        fontSize:15,
        fontWeight:"bold",
        color:'#414d',
        alignSelf:'center',        
    }

})

