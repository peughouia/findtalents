import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


const fetchFonts = () {
    return FontFace.load
}

export default function RenderProfil() {
  return (
    <View style = {styles.container}>
        <Text style = {styles.text}>profile</Text>
        <View style = {styles.card}>
            <Text style = {styles.text}>fred</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width:350,
        height:630,
        marginLeft:10,
        marginRight:10,
        justifyContent:"center",
        borderRadius:20,
        elevation:5,
        backgroundColor:"#fff",
        shadowOffset:{width:1,height:1},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6,
        fontWeight:"bold",
    },
    text:{
        fontSize:50
    }
})