import React, { useState } from "react";
import {Platform, View,Text,StyleSheet,ImageBackground, TextInput,
    TouchableOpacity,KeyboardAvoidingView, Alert } from "react-native";

//importation por l'authentification
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";


export default function Register({navigation}){

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const handleCreateAccount = () => {

        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            console.log("Account created!")
            const user = userCredential.user;
            console.log(user)
            Alert.alert("Account created")
            navigation.navigate('homecandidate')
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    }

    return(
        <ImageBackground style={styles.contain}
        source={require('../../assets/Image/font1.jpg')}
        >
            <View style={styles.login}>
                <Text style={styles.textlogin}>Register</Text>
            </View>

            <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.cardContainer}>
                
                <View style = {styles.welcome}>
                    <Text style = {styles.textwelcome}>Welcome</Text>
                    <Text style = {styles.textaccount}>Create your new account</Text>
                </View>

                <View style = {styles.ginput}>
                    <TextInput style = {styles.input2}
                    placeholder="Username"
                    value={ username }
                    onChangeText={text => setUsername(text)}
                    /> 

                    <TextInput style = {styles.input2}
                    placeholder="E-mail"
                    value={ email }
                    onChangeText={text => setEmail(text)}
                    /> 
                    
                
                    <TextInput style = {styles.input2}
                    placeholder="Password"
                    value={ password }
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    />
                </View>

                    <TouchableOpacity style = {styles.vbouton}
                    onPress = {handleCreateAccount}
                    >
                    <Text style={styles.bouton}>SignUp</Text>
                    </TouchableOpacity>
                
                <View style = {styles.vconnexion}>
                        <Text>I Already have an account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('connexion')}>
                        <Text style = {styles.textcon}> Connexion?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({

    //grand conteneur
    contain : {
        flex: 1,
    },
    //card du centre
    cardContainer:{
        position:"relative",
        top:60,
        padding:118,
        backgroundColor: 'white',
        borderTopLeftRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //View et text du login
    login:{
        flex:1,
        top:45,
        alignItems:"center",
        justifyContent:"center",
    },
    textlogin:{
        color:"white",
        fontWeight:"bold",
        fontSize:60
    },
    //view et text du welcomme back
    welcome:{
        alignItems:"center",
        position:"relative",
        width:"280%",
        bottom: 100,
    },
    textwelcome :{
            color: "#3589f2",
            fontSize:40,
            fontWeight:"bold"
    },
    textaccount:{
        fontSize:20,
        color:"gray"
    },
    //View et text de TextInput
    ginput:{
        width:300,
        position:"relative",
        bottom:80,
    },
    input1:{
        marginTop:30,
        backgroundColor:'lightgray',
        height:40,
        borderRadius:15,
        fontWeight:"bold",
        paddingHorizontal:15
    },
    input2:{
        marginTop:20,
        backgroundColor:"lightgray", 
        height: 40,
        borderRadius:15,
        fontWeight:"bold",
        paddingHorizontal:15
    },
    //view et text du bouton
    vbouton:{
        backgroundColor:"#3589f2",
        borderRadius:13,
        width:300,
        height:33,
        position:"relative",
        bottom:40
    },
    bouton:{
       color:"white",
       fontSize:20,
       fontWeight:"bold",
       textAlign:"center"
    },
    //view et ttext de register
    vconnexion:{
        width:250,
        flexDirection:"row",
        position:"relative",
        bottom:25,
    },
    textcon:{
        fontWeight:"bold"
    }

});