import React, { useEffect, useState } from 'react';
import { Text,       
         View,
         Image,
         StyleSheet,
         ScrollView ,
         TouchableOpacity,
         Alert,  
       } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFirestore,collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

export default function Profile({navigation}){
//current user
const auth = getAuth()
const currentuser = auth.currentUser

const [cards, setCards] = useState([]);
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const req = query(collection(db,"Profiles"), where ("Iduser","==",currentuser.uid));

    useEffect (  () => {
      const fetchDatas = async () => {
        const profil = []
          const querySnapshot = await getDocs(req);
          querySnapshot.forEach((doc) => {
              const {Firstname,City,LastDiploma,Profession,YearOfExp,ImageUrl} = doc.data();
              profil.push({
                id:doc.id,
                Firstname,
                City,
                LastDiploma,
                Profession,
                YearOfExp,
                ImageUrl
              })
          })
          console.log("Data =>",profil)
          setCards(profil)
      };
      fetchDatas();     
   },[])

    const dialogBoite = (id) =>{
      Alert.alert(
        'Avertissement',
        'voulez vous supprimer ce profil',
        [
          { text: 'Oui', onPress: () => deletes(id) },
          { text: 'Non'}
        ],
        {cancelable:false}
      )
    }

    const deletes = async (id) => { 
      const documentRef = db.collection('Profiles').doc(id);
      documentRef.delete()
      .then(() => {
        console.log('Document supprimé avec succès !');
        Alert.alert('information', "le profil a bien été supprimé")
      })
      .catch(error => {
        console.log('Erreur lors de suppression du doc:',error)
      })
    }
    return(
    <View style = {styles.container}>
      <View style = {styles.head}>
        <Text style={styles.title}>profiles</Text>
        <TouchableOpacity onPress={() => navigation.navigate('addprofile')}>
          <Ionicons name= "add-circle-outline" size = {45} color="black"/>
        </TouchableOpacity>
      </View>
      <View>
      <ScrollView>
      {cards.map((card,index) => (
        <View key = {index}>
          <TouchableOpacity style = {styles.cards} onPress={() => navigation.navigate('renderprofil',card.id)}>
                  <View style = {styles.image}>
                      <Image style = {styles.img}
                        source={{uri:card.ImageUrl}}/>
                  </View>
                  <View style = {styles.texte}>
                      <Text style = {styles.nom}>Name: {card.Firstname}</Text>
                      <Text style = {styles.ville}>City: {card.City}</Text>
                      <Text style = {styles.diploma}>Last Diploma: {card.LastDiploma}</Text>
                      <Text style = {styles.profession}>
                        Profession: {card.Profession}
                       <Text style = {styles.exp}>Since {card.YearOfExp} years Exp</Text>
                      </Text>
                  </View>
          </TouchableOpacity>
          <View style = {styles.option}>
              <TouchableOpacity style = {styles.update}>
              <Ionicons name= "cloud-upload-sharp" size = {25} color="orangered"/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.delete} onPress={() => dialogBoite(card.id)}>
              <Ionicons name= "trash-sharp" size = {25} color="orangered"/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.send}>
              <Ionicons name= "send-sharp" size = {25} color="orangered"/>
              </TouchableOpacity>
          </View>
        </View>
      ))}
        <View style = {styles.tese}></View>
      </ScrollView>  
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    backgroundColor:"lightgray",
    flex:1
  },
  head:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    height: 125,
    padding: 20,
  },
  title:{
    color: 'orangered',
    fontSize: 45,
    fontWeight: 'bold',
  },
  test:{
    fontSize:50
  },
  tese:{
    marginTop:150
  },
  test1:{
    marginBottom:250
  },
  update:{
    marginLeft:10,
    marginBottom:5
  },
  send:{
    marginRight:10,
    marginBottom:5
  },
  delete:{
    marginBottom:5
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
  cards:{
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
  img:{
    width:70,
    height:70,
    marginVertical:6,
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor: 'gray',
},
image:{
  justifyContent:'center',
},
texte:{
  marginLeft:13,
  alignItems:"flex-start",
  justifyContent:'center',
  width:"76%",
},
txtint:{
  flexDirection:"row",
},
nom:{
  fontSize:20,
  fontWeight:'bold'
},
ville:{
  fontSize:18,
},
diploma:{
  fontSize:18,
},
profession:{
  fontSize:14,
  fontWeight:'bold'
},
exp:{
  fontSize:14,
  marginLeft:5,
  fontWeight:'bold'
},
icon:{
  alignItems:"center",
  justifyContent:"center"
}
})