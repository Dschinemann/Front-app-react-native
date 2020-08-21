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

    containerInputs:{
        padding:5
    },
    title:{
        color:'#414d',
        fontWeight:"bold",
        fontSize:20,
        borderBottomWidth:2,
        alignSelf:"center"
    }

})