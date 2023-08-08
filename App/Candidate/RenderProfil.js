import React, {useEffect, useState} from 'react';
import { View,
         Text,
         Image,
         Alert, 
         StyleSheet,
         ScrollView,
         TouchableOpacity } from 'react-native';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import * as FileSystem from 'expo-file-system'
import {shareAsync} from 'expo-sharing'

export default function RenderProfil({route}) {
     //firestore
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

    const downloadPdf = async (url) => {
        if(url===""){
                Alert.alert('information!!', "aucun pdf disponible")
        }else{
        const filename = 'CV.pdf'
            const result = await FileSystem.downloadAsync(
                    url,
                    FileSystem.documentDirectory + filename
            );
                console.log(result)
                try{
                    save(result.uri);
                }catch(error){
                    console.log("erreur lors du telechargement",error)
            }
        }
       
    };

    const save = async (uri) => {
        shareAsync(uri)
        Alert.alert("information","votre fichier va etre telecharger")
    };
  return (
    <View style = {styles.container}>
        <View style = {styles.card}>
        { users && (
            <View>
            <ScrollView style ={styles.enter}>
                <View style ={styles.head}>
                    <Image style = {styles.img}
                    source={{uri:users.ImageUrl}
                    //source={require('../../assets/Image/font1.jpg')
                }/>
                    <View style ={styles.header}>
                    <Text style ={styles.txthead}>Professionnal</Text>
                    <Text style ={styles.txthead}>Profiles:
                    <Text style = {styles.txtpro}> {users.Profession}</Text>
                    </Text>
                    </View>
                </View>
                <View>
                    <Text style = {styles.text}>Firstname :<Text style = {styles.text1}>{users.Firstname}</Text> </Text>
                    <Text style = {styles.text}>Lastname : {users.Lastname}</Text>
                    <Text style = {styles.text}>city : {users.City}</Text>
                    <Text style = {styles.text}>Language : {users.Language}</Text>
                    <Text style = {styles.text}>Phone : {users.Phone}</Text>
                    <Text style = {styles.text}>Email : {users.Email}</Text>
                    <Text style = {styles.text}>Last Diploma : {users.LastDiploma}</Text>
                    <Text style = {styles.text}>Profession : {users.Profession}</Text>
                    <Text style = {styles.text}>Year of Profession : {users.YearOfExp} years</Text>
                    <Text style = {styles.text}>small description : {users.Description} years</Text>
                </View>
            </ScrollView>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.vbouton}>
                        <Text style = {styles.bouton}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.vbouton} onPress={() => downloadPdf(users.LinkPdf)}>
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
        alignItems:'center',
        backgroundColor:"lightgray",
    },
    card:{
        margin: 10,
        padding: 15,
        borderRadius:20,
        elevation:5,
        backgroundColor:"#fff",
        shadowOffset:{width:1,height:1},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        marginVertical:45,
    
    },
    head:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:10
    },
    header:{
        justifyContent:"center",
        flexGrow:1,
        width:50,
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
    txtpro:{
        color:'orangered'
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