import { StyleSheet, Text, View,TouchableOpacity,ScrollView,TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function Addprofile({navigation}){

    return(
    <View style = {styles.container}> 
        <View style = {styles.head}>
            <Text style = {styles.title}>Add your Profile</Text>
            <TouchableOpacity>
            <Ionicons name= "save-outline" size = {40} color="white"/>
            </TouchableOpacity>   
        </View> 

        <View style = {styles.image}>
             
        </View>

        <ScrollView style = {styles.input}>
                <Text style = {styles.txtnom}>Firstname</Text>
                <TextInput style = {styles.textinput}></TextInput>
                <Text style = {styles.txtnom}>Lastname</Text>
                <TextInput style = {styles.textinput}></TextInput>
                <Text style = {styles.txtnom}>City</Text>
                <TextInput style = {styles.textinput}></TextInput>
                <Text style = {styles.txtnom}>Phone</Text>
                <TextInput style = {styles.textinput}></TextInput>
                <Text style = {styles.txtnom}>Language</Text>
                <TextInput style = {styles.textinput}></TextInput>
                <Text style = {styles.txtnom}>Diploma</Text>
                <TextInput style = {styles.textinput}></TextInput>
            <View style = {styles.metier}>
                <View>
                <Text style = {styles.txtnom}>Metier</Text>
                <TextInput style = {styles.inputmet}></TextInput>
                </View>
                <View>
                <Text style = {styles.txtnom}>Année EXP</Text>
                <TextInput style = {styles.inputexp}
                keyboardType='numeric'
                ></TextInput>
                </View>
            </View>
            <Text style = {styles.txtnom}>Your Description</Text>
            <TextInput style = {styles.txtDescription}
             multiline={true}
             numberOfLines={4}
            ></TextInput>
            <Text style = {styles.space}></Text> 
        </ScrollView>  
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems:"center"
    },
    title:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
      },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'orangered',
        height: 95,
        padding: 20,
        width:"100%"
      },
      metier:{
        marginTop:15,
        marginBottom:25,
        marginLeft:5,
        flexDirection: 'row',
      },
      inputmet:{
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        width:230,
        height:40,
        paddingHorizontal:16,
      },
      inputexp:{
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        height:40,
        marginLeft:10,
        marginRight:10,
        paddingHorizontal:16,
      },
    txtnom:{
        marginLeft:5,
        fontSize:20,
        marginBottom:5,
        fontWeight:"bold"
    },
    input:{
        marginTop:15,
        width:350,
        marginLeft:10
    },
    textinput:{
        //flex: 1,
        backgroundColor: "#ccc",
        marginRight:30,
        marginLeft:30,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        height:40,
        marginTop:5,
        paddingHorizontal:16,
    },
    txtDescription:{
        backgroundColor: "white",
        marginRight:30,
        marginLeft:30,
        textAlignVertical: 'top',
        height: 120,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 15,
        padding: 10,
        fontSize: 16,
    },
    space:{
        marginTop:10
    }
});