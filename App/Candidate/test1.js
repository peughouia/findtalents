import React, { useState } from 'react';
import { Button,Text,StyleSheet,View, TextInput,TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../../config/firebases'

const SourcePage = ({ navigation }) => {

  const [nom,setNom] = useState("");
  const [prenom,setPrenom] = useState("");

  const updates = () => {
    const docRef = firebase.firestore().collection('Profiles').doc('Ac7etwZ82cVjElOlft5T')
     docRef.update({
             Firstname:nom,
             Lastname:prenom,
      })
      .then(() => {
        console.log("Document mis à jour avec succès !");
        Alert.alert('information','mise a jour reussie')
        setNom(''),
        setPrenom('')
      })
      .catch((error) => {
        console.log("Erreur lors de la mise à jour du document :", error);
      })
  }
  

  return (
    <View style = {styles.container}>
      <TextInput
        style = {styles.textinput}
        placeholder='nom'
        value = { nom }
        onChangeText = {(text) => setNom(text)}
      />
      <TextInput
        style = {styles.textinput}
        placeholder='Prenom'
        value = { prenom }
        onChangeText = {(text) => setPrenom(text)}
      />
      <TouchableOpacity onPress={updates}>
        <Text>update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SourcePage;


const styles = StyleSheet.create({

  container:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      marginTop:15
  },
  textinput:{
        fontSize:22,
        backgroundColor: "#ccc",
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        height:40,
        marginTop:5,
        paddingHorizontal:16,
  }
  });