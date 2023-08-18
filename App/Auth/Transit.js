import { View, Text, StyleSheet,TouchableOpacity,Image,ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

export default function Transit({navigation}) {
  return (
    <ImageBackground style={styles.container}
        source={require('../../assets/Image/font1.jpg')}>
      <View style = {styles.head}>
      <Image style = {styles.img}
              source={require('../../assets/Image/FindTalentsred.jpg')}
      />
      </View>
      <View style = {styles.body}>
        <Text style ={styles.txt}>what do you want to do?</Text>
        <TouchableOpacity style = {styles.recruiter} onPress={() => navigation.navigate('homerecruiter')}>
            <Text style = {styles.txtrecruiter}>Recruit</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.candidate} onPress={() => navigation.navigate('homecandidate')}>
            <Text style = {styles.txtcandidate}>To apply</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"lightgray",
        flex:1
    },
    head:{
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: 'white',
        height: 145,
        padding: 20,
        borderBottomRightRadius:60,
        borderBottomLeftRadius:60
      },
      img:{
        width:370,
        height:140,
        marginVertical:6,
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray',
        bottom:15,
    },
    body:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    candidate:{
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:"orangered",
        borderRadius:13,
        position:"relative",
        margin:30,
        width:"55%",
        height:"6%"
    },
    recruiter:{
        backgroundColor:"orangered",
        borderRadius:13,
        position:"relative", 
        width:"55%",
        height:"6%",
        alignItems:'center',
        justifyContent:"center",
    },
    txtcandidate:{
       color:"white",
       fontSize:20,
       fontWeight:"bold",
       textAlign:"center",
    },
    txtrecruiter:{
       color:"white",
       fontSize:20,
       fontWeight:"bold",
       textAlign:"center",
    },
    txt:{
        color:"black",
        fontSize:35,
        fontWeight:"bold",
        textAlign:"center",
        margin:10
    }
})