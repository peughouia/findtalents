import React,{useState} from 'react'
import { Platform,View, Text,ActivityIndicator ,StyleSheet,TouchableOpacity,Image,KeyboardAvoidingView, ScrollView,TextInput,Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MaterialIcons, Fontisto,FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../../config/firebases'
import { getFirestore,collection,addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


export default function AddCvTalent1({navigation}) {


    //firebase
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser.uid
    const db = getFirestore();
    const cvCollectionRef = collection(db, 'Cv');

    const addCv = (id,image) => {

        const newCv = {
            Iduser:id,
            UrlImage:image,
            Name:name,
            Profession:profession,
            Phone:phone,
            Email:email,
            Adresse:adresse,
            Profil:profil,
            Poste:poste,
            Workplace:workplace,
            StartExp : startDate,
            EndExp:endDate,
            Description:fonction,
            Diploma:diploma,
            School:school,
            StartFormation:startDatef,
            EndFormation:endDatef,
            Competence:competence,
            LevelComp:levelComp,
            language:language,
            nameCV:"Cv Talent1"
        };
        addDoc(cvCollectionRef,newCv)
        .then((docRef)=>{
            console.log("Document ajouter avec ID : ", docRef.id);
        })
        .catch((error) => {
            console.log("erreur subvenue !!",error)
        });

    }

    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    //info personelle
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [profil, setProfil] = useState('');
    const [phone, setPhone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [email, setEmail] = useState ("");
    //experience
    const [poste, setPoste] = useState ("");
    const [workplace, SetWorkplace] = useState ("");
    const [startDate, setStartDate] = useState ("");
    const [endDate, setEndDate] = useState ("");
    const [fonction, setFonction] = useState ("");
    //formation
    const [diploma, setDiploma] = useState ("");
    const [school, setSchool] = useState ("");
    const [startDatef, setStartDatef] = useState ("");
    const [endDatef, setEndDatef] = useState ("");
    //competence
    const [competence, setCompetence] = useState ("");
    const [levelComp, setLevelComp] = useState ("");
    const [language, setLanguage] = useState ("");
    const [levelLang,setLevelLang] = useState ("");

    var sizeicon=30
    var coloricon="orangered"

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
        if(image === ""){
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
                    {text:'OK',onPress: () => navigation.navigate('homecandidate')}
                ],
                {cancelable:false}
                )
        }catch(err){
            console.log("image non uploader",err)
        }
        setUploading(false);
        }
    }

    const takeUrlImg = async () => {
        const filename = image.uri.substring(image.uri.lastIndexOf('/') +1);
        var storageref = firebase.storage().ref();
        await storageref.child('images/'+filename)
        .getDownloadURL()
        .then( function(url){
              console.log(url)
              addCv(userId,url)
        }).catch(function(error){
                console.log("impossible",error)
        })
        
    }

  return (
    <View style ={styles.container}>
      <View style = {styles.head}>
            <TouchableOpacity onPress={() =>  navigation.goBack()}>
                <Ionicons name= "arrow-back-outline" size = {35} color="white"/>
            </TouchableOpacity> 
            <Image style = {styles.img}
              source={require('../../../assets/Image/FindTalentswhite.png')}
            />
            {isLoading?(
                    <ActivityIndicator 
                    size="large" 
                    color="white"
                    style = {styles.chargement}
                     />
            ):(
                <TouchableOpacity onPress={uploadImage}>
                <Ionicons name="md-save-outline" size={33} color="white" />
                 </TouchableOpacity>
            )}
            
            
        </View> 
        <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView style = {styles.input}>

            <View  style = {styles.piccard}>
                             {image && <Image 
                            style = {styles.image}
                            source={{uri:image.uri}}/>}
                            <TouchableOpacity  style = {styles.btnselectimg} onPress={pickImage}>
                                <Text style = {styles.txtselectimg}>select Image</Text>
                            </TouchableOpacity>
            </View>

            <View style = {styles.foot}>
                <Text style = {styles.curiculum}>informations personnelle</Text>
            </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={sizeicon} color= {coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter your Name" 
                         value = { name }
                         onChangeText = {(text) => setName(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <MaterialIcons name="work-outline" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter your Profession" 
                         value = { profession }
                         onChangeText = {(text) => setProfession(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <Ionicons name="ios-call-outline" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter your number phone" 
                         keyboardType='numeric'
                         value = { phone }
                         onChangeText = {(text) => setPhone(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter your Email" 
                         value = { email }
                         onChangeText = {(text) => setEmail(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialIcons name="place" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Your Adresse (rue, quartier, ville)" 
                         value = { adresse }
                         onChangeText = {(text) => setAdresse(text)}
                        />
                </View>

                <View style = {styles.txtnom}>
                        <Text style = {styles.txtnom}>Enter Your Profil</Text>
                        <TextInput style={styles.txtProfil}
                                placeholder='you can talk about your qualities and your way of working or what you have already achieved'
                                multiline={true}
                                numberOfLines={4}
                                value={profil}
                                onChangeText = {(text) => setProfil(text)}
                        />
                </View>

                <View style = {styles.foot}>
                <Text style = {styles.curiculum}>Experiences Pro</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="ios-code" size={sizeicon} color= {coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter name of experience" 
                         value = { poste }
                         onChangeText = {(text) => setPoste(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="home-outline" size={sizeicon} color= {coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter name of your workPlace" 
                         value = { workplace }
                         onChangeText = {(text) => SetWorkplace(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="newspaper-outline" size={sizeicon} color= {coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="small description of your work" 
                         value = { fonction }
                         onChangeText = {(text) => setFonction(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <Fontisto name="date" size={sizeicon} color={coloricon}/>
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter Start Date (month/year)" 
                         value = { startDate }
                         onChangeText = {(text) => setStartDate(text)}
                        />
                </View>    

                <View style={styles.inputContainer}>
                    <Fontisto name="date" size={sizeicon} color={coloricon}/> 
                    <TextInput 
                         style={styles.inpute}
                         placeholder="Enter End Date (month/year)" 
                         value = { endDate }
                         onChangeText = {(text) => setEndDate(text)}
                    />
                </View> 

                <View style = {styles.foot}>
                <Text style = {styles.curiculum}>Formation</Text>
                </View>

                <View style={styles.inputContainer}>
                 <Ionicons name="school-outline" size={sizeicon} color= {coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter Name of your diploma" 
                         value = { diploma }
                         onChangeText = {(text) => setDiploma(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <FontAwesome5 name="school" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter name of School" 
                         value = { school }
                         onChangeText = {(text) => setSchool(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <Fontisto name="date" size={sizeicon} color={coloricon}/>
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter Start Date (month/year)" 
                         value = { startDatef }
                         onChangeText = {(text) => setStartDatef(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <Fontisto name="date" size={sizeicon} color={coloricon}/>
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter End Date (month/year)" 
                         value = { endDatef }
                         onChangeText = {(text) => setEndDatef(text)}
                        />
                </View>

                <View style = {styles.foot}>
                <Text style = {styles.curiculum}>Competence</Text>
                </View>

                <View style={styles.inputContainer}>
                <FontAwesome5 name="list" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter your competences" 
                         value = { competence }
                         onChangeText = {(text) => setCompetence(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                <FontAwesome5 name="level-up-alt" size={sizeicon} color={coloricon} />
                        <TextInput 
                        keyboardType='numeric'
                         style={styles.inpute}
                         placeholder="Level in this competences /10" 
                         value = { levelComp }
                         onChangeText = {(text) => setLevelComp(text)}
                        />
                </View>

                <View style = {styles.foot}>
                <Text style = {styles.curiculum}>Language</Text>
                </View>


                <View style={styles.inputContainer}>
                        <Ionicons name="language-outline" size={sizeicon} color= {coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Enter your prefere language" 
                         value = { language }
                         onChangeText = {(text) => setLanguage(text)}
                        />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome5 name="level-up-alt" size={sizeicon} color={coloricon} />
                        <TextInput 
                         style={styles.inpute}
                         placeholder="Level in this language" 
                         value = { levelLang }
                         onChangeText = {(text) => setLevelLang(text)}
                        />
                </View>
                    <View style = {styles.space}></View>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'orangered',
        height: 100,
        padding: 20,
        width:"100%"
    },
    img:{
        width:160,
        height:60,
        marginRight:100,
        top:10,
        resizeMode: 'cover',
        borderRadius: 20,
        bottom:15,
    },
    input:{
        marginTop:15,
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
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
      },
      inpute:{
        flex: 1,
        paddingLeft: 10,
        fontSize:20,
      },
    txt:{
        fontSize:150
    },
    txtnom:{
        alignItems:"center",
        fontSize:20,
        marginBottom:5,
        fontWeight:"bold"
    },
    txtProfil:{
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
    curiculum:{
        fontSize:21,
        fontWeight:'bold',
        color:'orangered',
        backgroundColor:'lightgray'
    },
    foot:{
        alignItems:"center",
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'lightgray',
    },
    space:{
        marginTop:130
    },
    piccard:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        width:105,
        height:105,
        marginHorizontal:20,
        resizeMode: 'contain',
        borderRadius: 50,
        backgroundColor: 'gray',
    },
    btnselectimg:{
        backgroundColor:"orangered",
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:15,
        borderRadius:13,
        width:115,
        height:43,
    },
    txtselectimg:{
        fontWeight:"bold",
        color:"white",
        fontSize:16,
    },
})