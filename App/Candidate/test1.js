import React, { useState } from 'react';
import { View, TextInput, ScrollView,StyleSheet, Text } from 'react-native';


const SourcePage = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [datas, setDatas] = useState ([
    { id: '1', nom: 'Peughouia 1', categorie: 'Catégorie 1' },
    { id: '2', nom: 'fred', categorie: 'Catégorie 2' },
    { id: '3', nom: 'tanko fred', categorie: 'Catégorie 1' },
    { id: '4', nom: 'kaze cedric', categorie: 'Catégorie 3' },
    { id: '5', nom: 'nkuete ben', categorie: 'Catégorie 2' },
  ])
  const [data, setData] = useState([
    'Peughouia',
    'Kaze 2',
    'Tanko 3',
    'Peughouia 4',
    'Nkuete 5 kaze',
  ]);

    
    const filteredData = datas.filter(item => {
      return item.nom.toLowerCase().includes(searchText.toLowerCase()) &&
              item.categorie.toLowerCase().includes(searchText.toLowerCase()) 
    });
   
  
  /*const filteredData = data.filter(element =>
    element.toLowerCase().includes(searchText.toLowerCase())
  );*/
  return (
    
    <View style={styles.container}>
      <TextInput
        style={{ height: 40,width:210, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        value={searchText}
        placeholder="Recherche..."
        onChangeText={text => setSearchText(text)}
      />
   
      <ScrollView>
        {filteredData.map((element,index) => (
          <View key={index}>
            <Text >{element.nom}</Text>
            <Text >{element.categorie}</Text>
          </View>
          
        ))}
      </ScrollView>
    </View>

  );};

export default SourcePage;


const styles = StyleSheet.create({

  container:{
      flex:1,
      alignItems:"center",
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

