import React, { useState } from 'react';
import { View, TextInput, Button,StyleSheet } from 'react-native';

export default function AddCardScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCard = () => {
    route.params.addCard(title, description);
    navigation.goBack();
  };

  return (
    <View style = {styles.container}>
      <TextInput
        placeholder="Titre de la carte"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Description de la carte"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Ajouter" onPress={handleAddCard} />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        marginHorizontal:20
    }
})