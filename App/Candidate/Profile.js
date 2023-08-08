import React, { useEffect, useState } from 'react';
import { Text,       
         View,
         Image,
         StyleSheet,
         ScrollView ,
         TouchableOpacity,
         Alert,  
         RefreshControl
       } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFirestore,collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { firebase } from '../../config/firebases'

export default function Profile({navigation}){
//current user
const auth = getAuth()
const currentuser = auth.currentUser
const [refreshing, setRefreshing] = useState(false);
const [statusPub, setStatusPub] = useState(false);
//var statusPub = false

const [cards, setCards] = useState([]);
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const req = query(collection(db,"Profiles"), where ("Iduser","==",currentuser.uid));

const fetchDatas = async () => {
  const profil = []
    const querySnapshot = await getDocs(req);
    querySnapshot.forEach((doc) => {
        const {Firstname,City,LastDiploma,Profession,YearOfExp,ImageUrl,Publish} = doc.data();
        profil.push({
          id:doc.id,
          Firstname,
          City,
          LastDiploma,
          Profession,
          YearOfExp,
          ImageUrl,
          Publish
        })
    })
    //console.log("Data =>",profil)
    setCards(profil)
    console.log(profil)
    setRefreshing(false);
};
    useEffect (  () => {
      fetchDatas();     
   },[])

   const handleRefresh = () => {
    setRefreshing(true);
    fetchDatas();
  };



  const Publishe = async (id) => {
     
        setStatusPub(true)
        updatedata(id)
  }

  const updatedata = (refDoc) =>{
    const docRef = firebase.firestore().collection('Profiles').doc(refDoc)
 docRef.update({
    Publish : statusPub
  })
  .then(() => {
        if(statusPub===true){
          console.log("Document mis à jour avec succès !");
           Alert.alert('information','le profil a été publier')
        }else{
          console.log("Document mis à jour avec succès !");
           Alert.alert('information','le profil a été retirer')
        }
    
  })
  .catch((error) => {
    console.log("Erreur lors de la mise à jour du document :", error);
  })

}
  


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
        <View style = {styles.log}>
            <Image style = {styles.logo} source={require("../../assets/Image/FindTalentsred1.jpg")}/>
            <Text style={styles.title}>profiles</Text>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('addprofile')}>
          <Ionicons name= "add-circle-outline" size = {45} color="black"/>
        </TouchableOpacity>
      </View>
      <View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      >
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
                       <Text style = {styles.exp}> Since {card.YearOfExp} years Exp</Text>
                      </Text>
                  </View>
          </TouchableOpacity>
          <View style = {styles.option}>
              <TouchableOpacity style = {styles.update}>
              <Ionicons name= "create-outline" size = {25} color="orangered" onPress={() => navigation.navigate('updateprofil',card.id)}/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.delete} onPress={() => dialogBoite(card.id)}>
              <Ionicons name= "trash-sharp" size = {25} color="orangered"/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.send}>
                   <Ionicons name= "send-sharp" size = {25} color="orangered" onPress={() => Publishe(card.id)}/>
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
    marginLeft:5
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
},
log:{
    flexDirection:'row'
},
logo:{
  width:80,
  height:45,
  marginVertical:6,
  resizeMode: 'cover',
  borderRadius: 20,
},
})