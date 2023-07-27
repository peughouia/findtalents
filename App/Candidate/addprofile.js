import React, { useState } from 'react'
import { Text, 
         View,
         Image, 
         Alert,
         Platform,
         TextInput,
         StyleSheet,
         ScrollView,
         SafeAreaView, 
         TouchableOpacity,
         KeyboardAvoidingView,
        } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../config/firebases'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getFirestore,collection,addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


export default function Addprofile({navigation}){

    //variable de stockage de données
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [language, setLanguage] = useState("");
    const [diploma, setDiploma] = useState("");
    const [profession, setProfession] = useState("");
    const [experience, SetExperience] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false)
    //firebase
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const db = getFirestore();
    const usersCollectionRef = collection(db, 'Profiles');
   

    //ajouter les information du profile a firebase
    const addProfile = () => {
        const newUser = {
            Firstname: firstname,
            Lastname : lastname,
            City :city, 
            Phone:phone,
            Language : language,
            LastDiploma: diploma,
            Profession : profession,
            YearOfExp: experience,
            Description:description,
        };
        addDoc(usersCollectionRef,newUser)
        .then((docRef)=>{
            console.log("Document ajouter avec ID : ", docRef.id);
        })
        .catch((error) => {
            console.log("erreur subvenue !!",error)
        });

        if (currentUser) {
            // L'utilisateur est connecté
            const userId = currentUser.uid;
            console.log('ID de l\'utilisateur courant:', userId);
          } else {
            // Aucun utilisateur connecté
            console.log('Aucun utilisateur connecté');
          }
    }
    //fonction pour recuperer un fichier a partir de mon appareil
    const uploadFile = async () => {
        try{
            const file = await DocumentPicker.getDocumentAsync({
                type:'application/pdf'
            });
            console.log(file.uri)
            setPdf(file.name)
            
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

    //fonction pour recuperer une image a partir de mon appareil
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[5,4],
            quality:1
        });
        const src = {uri: result.assets[0].uri};
        console.log(src);
        setImage(src);
    }
    //fonction pour envoyer l'image sur firebase
    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') +1);
        var ref = firebase.storage().ref().child('images/'+filename).put(blob);
        try{
                await ref;
                console.log("image uploader")
        }catch(err){
            console.log("image non uploader",err)
        }
        setUploading(false);
       

        //pour recuperer l'url de l'image
        var storageref = firebase.storage().ref();
        storageref.child('images/'+filename)
        .getDownloadURL()
        .then(function(url){
                console.log(url)          
        }).catch(function(error){
                console.log("impossible",error)
        })

         addProfile() 
    }
    

    return(
    <View style = {styles.container}> 
        <View style = {styles.head}>
            <TouchableOpacity onPress={() =>  navigation.navigate('homecandidate')}>
                <Ionicons name= "arrow-back-outline" size = {40} color="white"/>
            </TouchableOpacity>
            <Text style = {styles.title}>Add your Profile</Text>
            <TouchableOpacity onPress={uploadImage}>
            <Ionicons name= "save-outline" size = {40} color="white"/>
            </TouchableOpacity>   
        </View> 

        <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView style = {styles.input}>

                    <SafeAreaView style = {styles.select}>
                        <View>
                            {image && <Image 
                            style = {styles.image}
                            source={{uri:image.uri}}/>}
                            <TouchableOpacity onPress={pickImage} style = {styles.btnselectimg}>
                                <Text style = {styles.txtselectimg}>select Image</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            { pdf?
                            <View style = {styles.card}>
                            <Text > {pdf} </Text>
                            </View>:
                            <></>
                            }
                            <TouchableOpacity onPress={uploadFile} style = {styles.btnselectpdf}>
                                <Text style = {styles.txtselectpdf}>add cv</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    <Text style = {styles.txtnom}>Firstname</Text>
                    <TextInput style = {styles.textinput}
                            value = { firstname }
                            onChangeText = {(text) => setFirstname(text)}
                    />

                    <Text style = {styles.txtnom}>Lastname</Text>
                    <TextInput style = {styles.textinput}
                            value={lastname}
                            onChangeText = {(text) => setLastname(text)}
                    />
                                
                    <Text style = {styles.txtnom}>City</Text>
                    <TextInput style = {styles.textinput}
                            value={city}
                            onChangeText = {(text) => setCity(text)}
                    />

                    <Text style = {styles.txtnom}>Phone</Text>
                    <TextInput style = {styles.textinput}
                            keyboardType='numeric'
                            value={phone}
                            onChangeText = {(text) => setPhone(text)}
                    />

                    <Text style = {styles.txtnom}>Language</Text>
                    <TextInput style = {styles.textinput}
                            value={language}
                            onChangeText = {(text) => setLanguage(text)}
                    />

                    <Text style = {styles.txtnom}>Last Diploma</Text>
                    <TextInput style = {styles.textinput}
                            value={diploma}
                            onChangeText = {(text) => setDiploma(text)}
                    />

                    <Text style = {styles.txtnom}>Profession</Text>
                    <TextInput style = {styles.textinput}
                            value={profession}
                            onChangeText = {(text) => setProfession(text)} 
                    />

                    <Text style = {styles.txtnom}> EXP Year</Text>
                    <TextInput style = {styles.textinput}
                            keyboardType='numeric'
                            value={experience}
                            onChangeText = {(text) => SetExperience(text)}
                    />

                    <Text style = {styles.txtnom}>Your Description</Text>
                    <TextInput style = {styles.txtDescription}
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText = {(text) => setDescription(text)}
                    />

                    <Text style = {styles.space}></Text> 

            </ScrollView>  
        </KeyboardAvoidingView>
    </View>
)}

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems:"center"
    },

    card:{
        width:120,
        height:100,
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
        right:15
    },

    btnselectpdf:{
        backgroundColor:"orangered",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:13,
        width:100,
        height:33, 
    },
    txtselectpdf:{
        fontWeight:"bold",
        color:"white",
        fontSize:16,
    },

    btnselectimg:{
        backgroundColor:"orangered",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:13,
        width:100,
        height:33,
        left:9
    },
    txtselectimg:{
        fontWeight:"bold",
        color:"white",
        fontSize:16,
    },

    select:{
        flexDirection:"row",
        justifyContent:"space-between"
    },

    image:{
        width:120,
        height:100,
        marginVertical:6,
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
        fontSize:22,
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
        marginTop:100
    }
});