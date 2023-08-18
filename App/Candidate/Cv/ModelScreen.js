import { View, Text, StyleSheet,Image,TouchableOpacity,ScrollView, } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ModelScreen({navigation}) {
  return (
    <View style = {styles.container}>
        <View style = {styles.head}>
            <View style = {styles.log}>
                <Image style = {styles.logo} source={require("../../../assets/Image/FindTalentsred1.jpg")}/>
                <Text style={styles.title}>Modeles CV</Text>
            </View>
      </View>
        <ScrollView style ={styles.contain}>
                <View style ={styles.ligne}>
                    <TouchableOpacity style ={styles.card} onPress={() => navigation.navigate('imgcv1')}>
                        <Image style = {styles.sizecv} source={require("../../../assets/Image/CvTalent1.png")}/>
                        <Text  style = {styles.txtcv} >Cv Talent 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.card} onPress={() => navigation.navigate('cvtalent2')}>
                        <Image style = {styles.sizecv} source={require("../../../assets/Image/CvTalent2.png")}/>
                        <Text  style = {styles.txtcv} >Cv Talent 2</Text>
                    </TouchableOpacity>
                </View>

                <View style ={styles.ligne}>
                    <TouchableOpacity style ={styles.card}>
                        <Image style = {styles.sizecv} source={require("../../../assets/Image/CvTalent3.png")}/>
                        <Text  style = {styles.txtcv} >Cv Talent 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.card}>
                        <Image style = {styles.sizecv} source={require("../../../assets/Image/CvTalent4.png")}/>
                        <Text  style = {styles.txtcv} >Cv Talent 4</Text>
                    </TouchableOpacity>
                </View>

                <View style ={styles.ligne}>
                    <TouchableOpacity style ={styles.card}>
                        <Image style = {styles.sizecv} source={require("../../../assets/Image/CvTalent5.jpg")}/>
                        <Text  style = {styles.txtcv} >Cv Talent 5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.card}>
                        <Image style = {styles.sizecv} source={require("../../../assets/Image/CvTalent6.png")}/>
                        <Text  style = {styles.txtcv} >Cv Talent 6</Text>
                    </TouchableOpacity>
                </View>

                <View style ={styles.ligne}>
                    <TouchableOpacity style ={styles.card}>

                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.card}>

                    </TouchableOpacity>
                </View>
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"lightgray",
        flex:1
    },
    contain:{
        
    },
    card:{
        marginHorizontal:15,
        marginVertical:12,
        height:220,
        width:150,
        justifyContent:"flex-start",
        elevation:20,
        backgroundColor:"#fff",
        shadowOffset:{width:10,height:10},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        fontWeight:"bold",
        borderRadius:20,
    },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignContent:'center',
        backgroundColor: 'white',
        height: 125,
        padding: 20,
      },
    log:{
        flexDirection:'row'
    },
    logo:{
        width:90,
        height:50,
        marginVertical:6,
        resizeMode: 'cover',
        },
    sizecv:{
        width:"100%",
        height:"80%",
        resizeMode: 'cover',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    txtcv:{
        fontSize:18,
        color:'orangered',
        fontWeight:'bold',
        marginHorizontal:24,
        marginVertical:8
    },
    title:{
        color: 'orangered',
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft:10,
        top:10
    },
    ligne:{
        flexDirection:'row',
        justifyContent:'space-between',
        //borderWidth:1,
        marginHorizontal:10,
        marginVertical:10
    }
})