import React, { useState } from 'react';
import { Button,Text,StyleSheet,View } from 'react-native';

const SourcePage = ({ navigation }) => {
  const [variableSource, setVariableSource] = useState('ange');

  const handleButtonClick = () => {
    // Transférer la valeur de la variable source à la page de destination
    navigation.navigate('destinationpage', { variableDest: variableSource });
  };

  return (
    <View style = {styles.container}>
      {/* Afficher la valeur de la variable source */}
      <Text>{variableSource}</Text>
      {/* Bouton pour déclencher le transfert de la valeur */}
      <Button title="Transférer" onPress={handleButtonClick} />
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
  });