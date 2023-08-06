import React, { useState } from "react";
import {View,
        Text,
        Platform,
        Alert,
        TextInput,
        StyleSheet,
        ActivityIndicator,
        ImageBackground,
        TouchableOpacity,
        KeyboardAvoidingView } from "react-native";
//importation pour la connection
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";


export default function Connexion({navigation}){

        const [isLoading, setIsLoading] = useState(false);
        //variable pour recuperer dans les chaps de texte
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        //variable pour firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app)
        //fonction pour declancher la connection
        const handleSignIn = () => {
            setIsLoading(true);
            signInWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {
                console.log('signed in')
                const user = userCredential.user;
                console.log(user.uid)
                navigation.navigate('transit')
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
                    Alert.alert('Information','Email or password is not valid')
                setIsLoading(false);
            })
        }
   

    return(  
        <ImageBackground style={styles.container}
        source={require('../../assets/Image/font1.jpg')}> 

            <View style={styles.login}>
                <Text style={styles.textlogin}>Login</Text>
            </View>

        <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.cardContainer}>

                <View style = {styles.welcome}>
                    <Text style = {styles.textwelcome}>Welcome Back</Text>
                    <Text style = {styles.textaccount}>Login to your account</Text>
                </View>
                
                <View style = {styles.ginput}>
                    <TextInput style = {styles.input1}
                    placeholder="E-mail/username"
                    value = { email }
                    onChangeText = {(text) => setEmail(text)}
                    />
                
                    <TextInput style = {styles.input2}
                    placeholder="Password"
                    secureTextEntry
                    value = { password }
                    onChangeText = {(text) => setPassword(text) }
                    />
                </View>
            
                <View style = {styles.forgot}>
                    <TouchableOpacity>
                        <Text style = {styles.textforgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {   isLoading?(
                    <ActivityIndicator 
                    size="large" 
                    color="orangered"
                    style = {styles.chargement}
                     />
                ):(
                    <TouchableOpacity style = {styles.vbouton}
                        onPress={handleSignIn}>
                        <Text style={styles.bouton}>Login</Text>
                    </TouchableOpacity>
                )}
                
                
                <View style = {styles.vregister}>
                    <Text>I don't have an account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('register')}>
                    <Text style = {styles.textreg2}> Register?</Text></TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      
    );
}

const styles = StyleSheet.create({
    //grand conteneur
    container : {
        flex: 1,
    },
    //card du centre
    cardContainer:{
        position:"relative",
        top:60,
        padding:155,
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
            //color: "#3589f2",
            color: "orangered",
            fontSize:40,
            fontWeight:"bold",
    },
    textaccount:{
        fontSize:20,
        color:"gray",
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
    //view du texte forgot
    forgot:{
        width:150,
        left: 90,
        bottom:70
    },
    textforgot:{
        fontWeight:"bold"
    },
    //view et text du bouton
    vbouton:{
        backgroundColor:"orangered",
        borderRadius:13,
        width:300,
        height:33,
        position:"relative",
        top:10,
    },
    bouton:{
       color:"white",
       fontSize:20,
       fontWeight:"bold",
       textAlign:"center",
    },
    //view et ttext de register
    vregister:{
        flexDirection:"row",
        position:"relative",
        top:20,
        width:232,
    },
    textreg2:{
        fontWeight:"bold"
    }
  });
