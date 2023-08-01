import React, {useEffect, useState} from 'react';
import { View,
         Text,
         Image,
         Alert, 
         StyleSheet,
         ScrollView,
         TouchableOpacity } from 'react-native';
import { getFirestore,collection,doc,setDoc,getDoc,getDocs,onSnapshot } from 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import * as FileSystem from 'expo-file-system'
import {shareAsync} from 'expo-sharing'

export default function RenderProfil() {
     //firestore
     const app = initializeApp(firebaseConfig)
     const db = getFirestore(app)
     const docRef = doc(db, 'Profiles','SojpCINlTPuU7Dpl5woV');
     const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchDatas = async () => {
            try{
                const docSnap = await getDoc(docRef);
                const userdata = docSnap.data()
                if(docSnap.exists()){
                    console.log(userdata);
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

   
    const getdata = async () =>{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log("document data:", docSnap.data())
        }else{
            console.log("No such document!");
        }
    }    

    const downloadPdf = async () => {
       const filename = 'CV.pdf'
       const result = await FileSystem.downloadAsync(
            'https://firebasestorage.googleapis.com/v0/b/findtalents-cf59a.appspot.com/o/pdfs%2FPO-20230719-001186.pdf?alt=media&token=3fe46174-3820-41fb-a2d7-a18ace146d75',
            FileSystem.documentDirectory + filename
       );
        console.log(result)
        try{
            save(result.uri);
        }catch(error){
            console.log("erreur lors du telechargement",error)
        }
    };

    const save = async (uri) => {
        shareAsync(uri)
        Alert.alert("information","votre fichier va etre telecharger")
    };

    const getAllData = async () => {
        const querySnapshot = await getDocs(collection(db,'Profiles'));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        })
    }
  return (
    <View style = {styles.container}>
        
        <View style = {styles.card}>
        { users && (
            <View>
            <ScrollView style ={styles.enter}>
                <View style ={styles.head}>
                    <Image style = {styles.img}
                    source={{uri:"https://firebasestorage.googleapis.com/v0/b/findtalents-cf59a.appspot.com/o/images%2F079bbfa2-ba76-4b3b-b09e-27028989dc05.png?alt=media&token=02dd7c05-4859-4a61-8075-7cbd170d1bad"}
                    //source={require('../../assets/Image/font1.jpg')
                }/>
                    <View style ={styles.header}>
                    <Text style = {styles.txthead}>Professionnal </Text>
                    <Text style = {styles.txthead}>Profiles: {users.Profession}</Text>
                    </View>
                </View>
                <View>
                    <Text style = {styles.text}>Firstname :<Text style = {styles.text1}>{users.Firstname}</Text> </Text>
                    <Text style = {styles.text}>Lastname : {users.Lastname}</Text>
                    <Text style = {styles.text}>city : {users.City}</Text>
                    <Text style = {styles.text}>Language : {users.Language}</Text>
                    <Text style = {styles.text}>Phone : {users.phone}</Text>
                    <Text style = {styles.text}>Last Diploma : {users.Diploma}</Text>
                    <Text style = {styles.text}>Profession : {users.Profession}</Text>
                    <Text style = {styles.text}>Year of Profession : {users.Experiences} years</Text>
                    <Text style = {styles.text}>small description : {users.Description} years</Text>
                </View>
            </ScrollView>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.vbouton}>
                        <Text style = {styles.bouton}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.vbouton} onPress={downloadPdf}>
                        <Text style = {styles.bouton}>Download cv</Text>
                    </TouchableOpacity>
                </View>
            </View>
                )}
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        //width:350,
        //height:660,
        margin: 10,
        padding: 10,
        //marginLeft:10,
        //marginRight:10,
        borderRadius:20,
        elevation:5,
        backgroundColor:"#fff",
        shadowOffset:{width:1,height:1},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6,
    
    },
    head:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:10
    },
    header:{
        //alignItems:'center',
        justifyContent:"center",
        //borderWidth:1,
        flexGrow:1,
        width:35
    },
    txthead:{
        fontWeight:"700",
        fontSize:25,
        marginLeft:10
    },
    enter:{
        marginHorizontal:10,
        marginVertical:10
    },
    img:{
        width:120,
        height:100,
        marginVertical:6,
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    text:{
        fontSize:25,
        marginBottom:12,
    },
    text1:{
        fontSize:20,
        fontWeight:'bold',
    },
    vbouton:{
        backgroundColor:"orangered",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:13,
        marginLeft:10,
        width:140,
        height:40,
        position:"relative",
    },
    bouton:{
       color:"white",
       fontSize:20,
       fontWeight:"bold",
       textAlign:"center"
    },
    bottom:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginRight:10
    }
})