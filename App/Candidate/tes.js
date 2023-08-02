import React from 'react';
import { Text,StyleSheet,View } from 'react-native';

const DestinationPage = ({ route }) => {
  // Récupérer la valeur transmise depuis la page source
     const { variableDest } = route.params;

  return (
    <View style ={styles.container}>
      <Text>
        La valeurs transmise est: {variableDest}
       </Text>
    </View> 
  );
};

export default DestinationPage;

const styles = StyleSheet.create({

  container:{
    flex:1,
      alignItems:"center",
      justifyContent:"center",
      marginTop:15
  },
  });