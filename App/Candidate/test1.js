import React, { useState } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

export default function Test1({navigation}) {
  const [cards, setCards] = useState([]);

  const addCard = (title, description) => {
    const newCard = { title, description };
    setCards([...cards, newCard]);
  };

  return (
    <View style = {styles.container}>
      <Text>Ma liste de cartes :</Text>
      {cards.map((card, index) => (
        <View key={index} style={{ margin: 10, padding: 10, backgroundColor: 'lightgray' }}>
          <Text>{card.title}</Text>
          <Text>{card.description}</Text>
        </View>
      ))}
      <Button
        title="Ajouter une carte"
        onPress={() => navigation.navigate('test2', { addCard })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop:20
    }
})