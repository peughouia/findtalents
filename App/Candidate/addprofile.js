import { StyleSheet,Image, Text, View,TouchableOpacity,ScrollView,TextInput,KeyboardAvoidingView, Button, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../config/firebases'
import Ionicons from 'react-native-vector-icons/Ionicons'



export default function Addprofile({navigation}){

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)

    const uploadFile = async () => {
        try{
            const file = await DocumentPicker.getDocumentAsync({
                type:'application/pdf'
            });

            if(file.type === 'success'){
                const response = await fetch(file.uri);
                const blob = await response.blob();

                const storageRef = firebase.storage().ref();
                const pdfRef = storageRef.child('pdfs/' + file.name);

                await pdfRef.put(blob);
                console.log('Fichier Pdf telecharger avec sucess !');
            }
        }catch(err){
            console.log('Erreur lors du telechargement :',err)
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });

        const src = {uri: result.assets[0].uri};
        console.log(src);
        setImage(src);
    }

    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') +1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try{
                await ref;
        }catch(err){
            console.log(err)
        }
        setUploading(false);
        Alert.alert('photo uploaded..!!');
        setImage(null);
    }
    

    return(
    <View style = {styles.container}> 
        <View style = {styles.head}>
            <Text style = {styles.title}>Add your Profile</Text>
            <TouchableOpacity>
            <Ionicons name= "save-outline" size = {40} color="white"/>
            </TouchableOpacity>   
        </View> 

        <SafeAreaView style = {styles.select}>
        {image && <Image 
        style = {styles.image}
        source={{uri:image.uri}}/>}
             <Button title='select' onPress={pickImage}/>
             <Button title='enregistrer' onPress={uploadImage}/>
             <Button title='select pdf' onPress={uploadFile}/>
        </SafeAreaView>

        <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null}>
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
                <Text style = {styles.txtnom}>Profession</Text>
                <TextInput style = {styles.inputmet}></TextInput>
                </View>
                <View>
                <Text style = {styles.txtnom}> EXP Year</Text>
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
        </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems:"center"
    },
    select:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    image:{
        width:100,
        height:100,
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray',
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