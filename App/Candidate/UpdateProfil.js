import React, { useState,useEffect } from 'react'
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
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import { firebase } from '../../config/firebases'

export default function UpdateProfil({ navigation,route }){

    
    const [isLoading, setIsLoading] = useState(false);
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

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const idi = route.params
    const docRef = doc(db, 'Profiles',idi);
    const [users, setUsers] = useState(null);


    useEffect(() => {
        const fetchDatas = async () => {
            try{
                const docSnap = await getDoc(docRef);
                const userdata = docSnap.data()
                if(docSnap.exists()){
                    //console.log(userdata);
                    setUsers(docSnap.data())
                }else{
                    console.log("No such document!");
                }
            }catch(error){
                console.error('document non recuperer',error);
            }
        };
        fetchDatas();
    }, []);       
    
    const verif = () => {
       setFirstname(users.Firstname)
       console.log(firstname)
    }
    
    const verifi = () => {
        Alert.alert("infomatio",
        "valider",[
            { text: 'Oui', onPress: () => verif() },
            { text: 'Non'}
        ]
        )
    }


    const updatedata = () =>{
        const docRef = firebase.firestore().collection('Profiles').doc(idi)
     docRef.update({
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
      })
      .then(() => {
        console.log("Document mis à jour avec succès !");
        Alert.alert('information','mise a jour reussie')
      })
      .catch((error) => {
        console.log("Erreur lors de la mise à jour du document :", error);
      })

    }

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


    return(
    <View style = {styles.container}> 
        <View style = {styles.head}>
            <TouchableOpacity onPress={() =>  navigation.navigate('homecandidate')}>
                <Ionicons name= "arrow-back-outline" size = {40} color="white"/>
            </TouchableOpacity>
            {isLoading?(
                    <ActivityIndicator 
                    size="large" 
                    color="white"
                    style = {styles.chargement}
                     />
            ):(
                <Text style = {styles.title}>Update Profile</Text>
            )}
            <TouchableOpacity onPress={verifi}>
            <Ionicons name= "save-outline" size = {40} color="white"/>
            </TouchableOpacity>   
        </View> 

        <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null}>
            {users && (
            <ScrollView style = {styles.input}>
                    <SafeAreaView style = {styles.select}>
                        <View>
                            {image && <Image 
                            style = {styles.image}
                            source={{uri:image.uri}}/>}
                            <TouchableOpacity  onPress={pickImage} style = {styles.btnselectimg}>
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
                            placeholder={users.Firstname}
                            placeholderTextColor="black"
                            value = { users.Firstname }
                            onChangeText = {(text) => setFirstname(text)}
                    />

                    <Text style = {styles.txtnom}>Lastname</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.Lastname}
                            placeholderTextColor="black"
                            value={lastname}
                            onChangeText = {(text) => setLastname(text)}
                    />

                    <Text style = {styles.txtnom}>Phone</Text>
                    <TextInput style = {styles.textinput}
                            keyboardType='numeric'
                            placeholder={users.Phone}
                            placeholderTextColor="black"
                            value={phone}
                            onChangeText = {(text) => setPhone(text)}
                    />

                    <Text style = {styles.txtnom}>E-mail</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.Email}
                            placeholderTextColor="black"
                            value={email}
                            onChangeText = {(text) => setEmail(text)}
                    />
                                
                    <Text style = {styles.txtnom}>City</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.City}
                            placeholderTextColor="black"
                            value={city}
                            onChangeText = {(text) => setCity(text)}
                    />

                    <Text style = {styles.txtnom}>Language</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.Language}
                            placeholderTextColor="black"
                            value={language}
                            onChangeText = {(text) => setLanguage(text)}
                    />

                    <Text style = {styles.txtnom}>Last Diploma</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.LastDiploma}
                            placeholderTextColor="black"
                            value={diploma}
                            onChangeText = {(text) => setDiploma(text)}
                    />

                    <Text style = {styles.txtnom}>Profession</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.Profession}
                            placeholderTextColor="black"
                            value={profession}
                            onChangeText = {(text) => setProfession(text)} 
                    />

                    <Text style = {styles.txtnom}> EXP Year</Text>
                    <TextInput style = {styles.textinput}
                            placeholder={users.YearOfExp}
                            keyboardType='numeric'
                            value={experience}
                            onChangeText = {(text) => SetExperience(text)}
                    />

                    <Text style = {styles.txtnom}>Your Description</Text>
                    <TextInput style = {styles.txtDescription}
                            placeholder={users.Description}
                            placeholderTextColor="black"
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText = {(text) => setDescription(text)}
                    />
                    <Text style = {styles.space}></Text> 
            </ScrollView>  
            )}
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
        marginLeft:27,
        fontSize:20,
        marginBottom:5,
        fontWeight:"bold"
    },

    input:{
        marginTop:15,
        //width:350,
        //marginLeft:10
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