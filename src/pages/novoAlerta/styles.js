import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,       
        alignItems: "center",
        padding:10,
        backgroundColor:"#FFDEAD"
    },
    inputs:{
        borderColor:"gray",
        borderWidth:1,
        height:40,
        width:300,
        borderRadius:10
                
    }, 
    cadastro:{
        padding:10
    },

    containerButton:{
        width:200,
        
    },
    containerInputs:{
        padding:10
        
    },
    containerAlerta:{
        flex:1,
        alignItems:"center",
        borderColor:"gray",
        borderWidth:2,
        marginBottom:250,
        padding:10,
        borderRadius:10,
        backgroundColor:'white'  
    },
    containerEndereço:{
        flex:1,
        alignItems:"center",
        borderColor:"gray",
        borderWidth:2,
        padding:10,
        borderRadius:10       
        
    },
    textArea:{
        minHeight:150,
        height:"auto",
        borderColor:"gray",
        borderWidth:1,
        width:300,
        borderRadius:10
       
    }

})