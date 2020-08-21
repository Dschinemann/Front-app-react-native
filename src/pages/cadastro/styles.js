import {StyleSheet } from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#FFFFE0",
        padding:10
        
    },
    inputs:{
        borderColor:"black",
        borderWidth:1,
        height:40,
        width:300,
        borderRadius:10
        
    },
    checkbox: {
        alignSelf: "center",
        paddingHorizontal:50,       
    }, 
    cadastro:{
        padding:10
    },

    containerButton:{
        alignItems:"center",
        padding:5,
        borderRadius:10
    },
    containerInputs:{
        padding:5
    },
    containerBox:{
        flex:1,
        flexDirection:"row",
    },
    label: {
        margin: 8,
        right:60,
        color:'#414d',
        fontSize:15,
        fontWeight:"bold"
        
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        
    },
    dataPicker:{
        padding:5,
        backgroundColor:'white'
    },
    containerCalendar:{
        padding:10
    },
    titulos:{
        color:'#414d',
        fontSize:15,
        fontWeight:"bold"
    },
    title:{
        color:'#414d',
        fontSize:30,
        fontWeight:"bold",
        paddingLeft:5,
        alignSelf:"center",             
    },
    create:{     
        alignSelf:"center",        
        borderBottomWidth:2,
            
    }

})

