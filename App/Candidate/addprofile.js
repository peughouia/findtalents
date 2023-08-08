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
         ActivityIndicator, 
         TouchableOpacity,
         KeyboardAvoidingView,
        } from 'react-native'
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../config/firebases'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getFirestore,collection,addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


export default function Addprofile({ navigation }){

    //fonction se soumission globale
    const send = () =>{
        if(image === null || firstname === ""  || lastname === "" ||
           email === ""   || city === ""  || profession === "" || language === "" ||
           diploma === "" || phone === "" || experience === "" || description === ""){
            Alert.alert('Champ Vide !!', 'veuillez remplir tout les champs svp');
           }else{
            uploadImage()
           }
        }
    const [borderColor, setBorderColor] = useState('#ccc');
    const [isLoading, setIsLoading] = useState(false);
    const [publish, setPublish] = useState(false);
    //variable de stockage de données
    const [image, setImage] = useState(null);
    const [pdf,setPdf]=useState(null)
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [language, setLanguage] = useState("");
    const [diploma, setDiploma] = useState("");
    const [profession, setProfession] = useState("");
    const [experience, SetExperience] = useState("");
    const [description, setDescription] = useState("");
    var sizeicon=30
    var coloricon="orangered"
    var pdfUrl = "";
    const [uploading, setUploading] = useState(false)

    //firebase
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser.uid
    const db = getFirestore();
    const usersCollectionRef = collection(db, 'Profiles');

    //ajouter les information du profile a firebase
    const addProfile = (id,imageURL,urlPdf) => {
        const newUser = {
            Firstname: firstname,
            Lastname : lastname,
            City :city,
            Email:email, 
            Phone:phone,
            Language : language,
            LastDiploma: diploma,
            Profession : profession,
            YearOfExp: experience,
            Description:description,
            ImageUrl : imageURL,
            Iduser : id,
            LinkPdf : urlPdf,
            Publish:publish
        };
        addDoc(usersCollectionRef,newUser)
        .then((docRef)=>{
            console.log("Document ajouter avec ID : ", docRef.id);
        })
        .catch((error) => {
            console.log("erreur subvenue !!",error)
        });
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
                    setIsLoading(true)
                    const response = await fetch(file.uri);
                    const blob = await response.blob();
    
                    const storageRef = firebase.storage().ref();
                    const pdfRef = storageRef.child('pdfs/' + file.name);
    
                    await pdfRef.put(blob);
                    console.log('Fichier Pdf telecharger avec sucess !'); 

                    pdfRef
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url)
                    })
                    setIsLoading(false)
            }
        }catch(err){
            console.log('Erreur lors du telechargement :',err)
        }
    }

    const test = () => {
        console.log(pdfUrl)
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
        if(image == null){
            Alert.alert('Image','veuillez ajouter une image svp')
        }else{
            setIsLoading(true)
            setUploading(true);
        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') +1);
        var ref = firebase.storage().ref().child('images/'+filename).put(blob);
        try{
                await ref;
                console.log("image uploader")
                takeUrlImg()
                setIsLoading(false)
                Alert.alert("Information","Enregistrement reussi",[
                    {text:'OK',onPress: () => navigation.goBack()}
                ],
                {cancelable:false}
                )
        }catch(err){
            console.log("image non uploader",err)
        }
        setUploading(false);
        }
    }


    //pour recuperer l'url de l'image
    const takeUrlImg = async () => {
        const filename = image.uri.substring(image.uri.lastIndexOf('/') +1);
        var storageref = firebase.storage().ref();
        await storageref.child('images/'+filename)
        .getDownloadURL()
        .then( function(url){
              console.log(url)
              addProfile(userId,url,pdfUrl)
        }).catch(function(error){
                console.log("impossible",error)
        })
        
    }
    
    const handleFocus = () => {
        setBorderColor('orangered');
      };

      const handleBlur = () => {
        setBorderColor('#ccc');
      };

    return(
    <View style = {styles.container}> 
        <View style = {styles.head}>
            <TouchableOpacity onPress={() =>  navigation.navigate('homecandidate')}>
                <Ionicons name= "arrow-back-outline" size = {35} color="white"/>
            </TouchableOpacity>
            {isLoading?(
                    <ActivityIndicator 
                    size="large" 
                    color="white"
                    style = {styles.chargement}
                     />
            ):(
                <Text style = {styles.title}>Add your Profile</Text>
            )}
            <TouchableOpacity onPress={test/*send*/}>
            
            <Ionicons name= "save-outline" size = {35} color="white"/>
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

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="person-outline" size={sizeicon} color= {coloricon} />
                        <TextInput //style={styles.inpute}
                         style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your Firstname" 
                         value = { firstname }
                         onChangeText = {(text) => setFirstname(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="person-circle-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your Lastname" 
                         value = { lastname }
                         onChangeText = {(text) => setLastname(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="ios-call-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         keyboardType='numeric'
                         placeholder="Enter your Phone number" 
                         value = { phone }
                         onChangeText = {(text) => setPhone(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="mail-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your Email" 
                         value = { email }
                         onChangeText = {(text) => setEmail(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <MaterialCommunityIcons name="city" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your City" 
                         value = { city }
                         onChangeText = {(text) => setCity(text)}
                        />
                    </View>
                                
                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="language-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your Language" 
                         value = { language }
                         onChangeText = {(text) => setLanguage(text)}
                        />
                    </View>
                        
                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="document-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your Last Diploma" 
                         value = { diploma }
                         onChangeText = {(text) => setDiploma(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <MaterialIcons name="work-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         placeholder="Enter your Profession" 
                         value = { profession }
                         onChangeText = {(text) => setProfession(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer,{ borderColor: borderColor }]}>
                    <Ionicons name="calendar-outline" size={sizeicon} color={coloricon} />
                        <TextInput style={styles.inpute}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                         keyboardType='numeric'
                         placeholder="your number of years of experience" 
                         value = { experience }
                         onChangeText = {(text) => SetExperience(text)}
                        />
                    </View>
                    <View style = {styles.txtnom}>
                        <Text style = {styles.txtnom}>Enter Your Description</Text>
                        <TextInput style={[styles.txtDescription,{ borderColor: borderColor }]}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder='you can talk about your qualities and your way of working or what you have already achieved'
                                multiline={true}
                                numberOfLines={4}
                                value={description}
                                onChangeText = {(text) => setDescription(text)}
                        />
                    </View>
                    
                    <Text style = {styles.space}></Text> 

            </ScrollView>  
        </KeyboardAvoidingView>
    </View>
)}

const styles = StyleSheet.create({
    container:{
     flex:1
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
        marginRight:30
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
        marginHorizontal:15,
        borderRadius:13,
        width:110,
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
        marginHorizontal:18,
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
        alignItems:"center",
        
        fontSize:20,
        marginBottom:5,
        fontWeight:"bold"
    },

    input:{
        marginTop:15,
    },

    textinput:{
        flex: 1,
        fontSize:22,
        backgroundColor: "#ccc",
        marginRight:30,
        marginLeft:30,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        //borderRadius: 10,
        height:40,
        marginTop:5,
        paddingHorizontal:16,
    },

    txtDescription:{
        backgroundColor: "white",
        marginRight:25,
        marginLeft:25,
        textAlignVertical: 'top',
        height: 125,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 15,
        padding: 10,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginRight:30,
        marginLeft:30,
        marginTop:25,
        margin:10,
       //borderRightWidth:1,
       //borderLeftWidth:1,
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
      },
      inpute:{
        flex: 1,
        paddingLeft: 10,
        fontSize:20,
      },
    space:{
        marginTop:100
    }
});