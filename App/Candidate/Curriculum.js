import { View,Alert, Text,Image, StyleSheet,ScrollView,RefreshControl,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { getFirestore,collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function Curriculum({navigation}) {

let fred ='yp'
  const html = `
    <html>
      <boby>
            <h1 align="center" > ${fred}Cv Talent 1</h1>
            <p style="color: red;">bonjour</p>
      </body>
    </html>
  `
  let generatecv = async () => {
      const file = await printToFileAsync({
        html:html,
        base64:false
      });

      await shareAsync(file.uri);
  }


  //current user an refreshing
  const auth = getAuth()
  const currentuser = auth.currentUser
  const [refreshing, setRefreshing] = useState(false);

  //firebase
  const [cards, setCards] = useState([]);
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const req = query(collection(db,"Cv"), where ("Iduser","==",currentuser.uid));

  const fetchDatas = async () => {
    const profil = []
      const querySnapshot = await getDocs(req);
      querySnapshot.forEach((doc) => {
          const {nameCV,Name} = doc.data();
          profil.push({
            id:doc.id,
            nameCV,
            Name
          })
      })
      //console.log("Data =>",profil)
      setCards(profil)
      console.log(profil)
      setRefreshing(false);
  };

  useEffect (() => {
    fetchDatas();     
 },[])

 const handleRefresh = () => {
  setRefreshing(true);
  fetchDatas();
};

    const dialogBoite = (id) =>{
      Alert.alert(
        'Avertissement',
        'voulez vous supprimer ce profil',
        [
          { text: 'oui', onPress: () => deletes(id) },
          { text: 'Non'}
        ],
        {cancelable:false}
      )
    }

const deletes = async (id) => { 
  const documentRef = db.collection('Cv').doc(id);
  documentRef.delete()
  .then(() => {
    console.log('Document supprimé avec succès !');
    Alert.alert('information', "le profil a bien été supprimé")
  })
  .catch(error => {
    console.log('Erreur lors de suppression du doc:',error)
  })
}

  return (
    <View style = {styles.container}>
        <View style = {styles.head}>
        <View style = {styles.log}>
            <Image style = {styles.logo} source={require("../../assets/Image/FindTalentsred1.jpg")}/>
            <Text style={styles.title}>CV</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('modelscreen')}>
          <Ionicons name= "add-circle-outline" size = {45} color="black"/>
        </TouchableOpacity>
      </View>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }>
                {cards.map((card,index) => (
                  <View key = {index}>
                  <TouchableOpacity style = {styles.cards} onPress={() => navigation.navigate('cvtalent1',card.id)} >
                  <View style = {styles.image}>
                      <Image style = {styles.img}
                        source={require('../../assets/Image/font1.jpg')}/>
                  </View>
                  <View style = {styles.texte}>
                      <Text style = {styles.titl}>Title: {card.nameCV} </Text>
                      <Text style = {styles.nom}>De: {card.Name} </Text>
                  </View>
              </TouchableOpacity>
              <View style = {styles.option}>
              <TouchableOpacity style = {styles.update}>
              <Ionicons name= "create-outline" size = {25} color="orangered"/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.delete} onPress={() => dialogBoite(card.id)}>
              <Ionicons name= "trash-sharp" size = {25} color="orangered"/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.send} onPress={generatecv}>
                   <Entypo name="download" size={25} color="orangered" />
              </TouchableOpacity>
            </View>
             </View>
          
                ))}
                
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"lightgray",
        flex:1,
    },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        height: 125,
        padding: 20,
      },
    log:{
        flexDirection:'row'
    },
        logo:{
        width:90,
        height:50,
        marginVertical:6,
        resizeMode: 'cover',
        borderRadius: 20,
        },
    title:{
        color: 'orangered',
        fontSize: 45,
        fontWeight: 'bold',
        marginLeft:10,
          },
          cards:{
            justifyContent:"space-between",
            margin: 10,
            padding: 10, 
            backgroundColor:"#fff",
            flexDirection:"row",
            fontWeight:"bold",
            shadowOpacity:0.3,
            shadowRadius:2,
            shadowColor:"#333",
            shadowOffset:{width:1,height:1},
            elevation:5,
            borderRadius:20,
          },
          image:{
            justifyContent:'center',
            
          },
          img:{
            width:70,
            height:70,
            marginVertical:6,
            resizeMode: 'cover',
            borderRadius: 20,
            backgroundColor: 'gray',
        },
        texte:{
          flexGrow:1,
          alignItems:"center",
          justifyContent:"center"
        },
        nom:{
          fontSize:20,
          fontWeight:"bold",
        },
        titl:{
          fontSize:20,
          fontWeight:"bold",
          color:"red"
        },
        option:{
          alignItems:"center",
          marginLeft:30,
          marginRight:30,
          flexDirection:"row",
          justifyContent:'space-between',
          backgroundColor:"#fff",
          bottom:10,
          borderBottomLeftRadius:15,
          borderBottomRightRadius:15,
          shadowOffset:{width: 0,height: 4},
          shadowRadius: 4,
          shadowOpacity:0.3,
          shadowRadius:2,
          shadowColor:"black",
          elevation: 5
        },
        send:{
          marginRight:10,
          marginBottom:5
        },
        update:{
          marginLeft:10,
          marginBottom:5
        },
})