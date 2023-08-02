import React, { useEffect, useState } from 'react';
import { Text,       
         View,
         Image,
         StyleSheet,
         ScrollView ,
         TouchableOpacity,
         Button,  
       } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from "../../config/firebases"

export default function Profile({navigation}){

const [cards, setCards] = useState([]);
const [id, setid] = useState('');
const todoref = firebase.firestore().collection('Profiles');

    useEffect (() => {
      todoref
      .onSnapshot(
        querySnapshot => {
          const profil = []
          querySnapshot.forEach((doc) => {
              const {Firstname,City,LastDiploma,Profession,YearOfExp} = doc.data()
              profil.push({
                id:doc.id,
                Firstname,
                City,
                LastDiploma,
                Profession,
                YearOfExp
              })
          })
          //console.log("Data =>",profil)
          setCards(profil)
        }
        )
    },[])




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
                        source={require('../../assets/Image/fred.jpg')}/>
                  </View>
                  <View style = {styles.texte}>
                      <Text style = {styles.nom}>{card.Firstname}</Text>
                      <Text style = {styles.ville}>{card.City}</Text>
                      <Text style = {styles.diploma}>{card.LastDiploma}</Text>
                      <View style = {styles.txtint}>
                        <Text style = {styles.profession}>{card.Profession}</Text>
                        <Text style = {styles.exp}>{card.YearOfExp} years Exp</Text>
                      </View>
                  </View>
                  <TouchableOpacity style = {styles.icon}>
                        <Ionicons name= "send-sharp" size = {23} color="orangered"/>
                        <Text>publish</Text>
                    </TouchableOpacity>
          </TouchableOpacity>
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
  marginLeft:5,
  justifyContent:'center',
  width:"66%"
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
  fontSize:13,
  marginLeft:10,
  fontWeight:'bold'
},
icon:{
  alignItems:"center",
  justifyContent:"center"
}
})