import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { getFirestore,collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app';


export default function Tes() {

  const [cards, setCards] = useState([]);
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const q = query(collection(db,"Profiles"), where ("Iduser","==","Swo0iAxq0SbMnpAjcGCOJPuOuDB2"));

  const teste =  async () => {
    const data = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const{Firstname} = doc.data();
      data.push({
        Firstname
      })
    })
    setCards(data)
  } 
  return (
    <View style = {styles.container}> 
    {cards.map((card,index) => (
        <View key = {index}>
            <Text>{card.Firstname}</Text>
        </View>
    ))}
    <TouchableOpacity onPress={teste}>
    <Text>fred</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:"center"
  }
})