import { View,Text,Image,StyleSheet,ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Imgcv1({navigation}) {
    return (
        <View style={styles.container}>
        <View style = {styles.head}>
            <TouchableOpacity style = {styles.back} onPress={() => navigation.goBack()}> 
                 <Ionicons name= "arrow-back-outline" size = {35} color="white"/>
            </TouchableOpacity> 
        </View> 
            <View style={styles.card}>     
                    <Image style = {styles.img} 
                    source={require("../../../assets/Image/cv1.jpg")}/>
            </View>
            <TouchableOpacity style = {styles.use} onPress={() => navigation.navigate('addCvtalent1')}>
                <Text style ={styles.txtuse}>UTILISER</Text>
            </TouchableOpacity>
        </View>
      )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"lightgray"

    },
    card:{
        bottom:20,
        marginTop:30,
        width:"95%",
        height:"82%",
        backgroundColor:"white"
    
    },
    img:{
        width:"100%",
        height:"100%",
        resizeMode:'stretch',
        backgroundColor: 'gray',
    },
    use:{
        bottom:25,
        alignItems:'center',
        marginTop:15,
        height:30,
        width:'90%',
        backgroundColor:'orangered',
        elevation:5,
        shadowOffset:{width:1,height:2},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        fontWeight:"bold",
    },
    txtuse:{
        fontSize:20,
        fontWeight:"bold",
        color:'white'
    },
    back:{
        marginRight:290
    },
    head:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'orangered',
        padding:10,
        width:"100%"
    },
})