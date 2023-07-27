import React from 'react';
import { Text,       
         View,
         StyleSheet,
         ScrollView ,
         TouchableOpacity,  
       } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({navigation}){

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
          <Text style = {styles.test1}></Text>
        </ScrollView>   
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
   
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
    fontSize:120
  },
  test1:{
    marginBottom:250
  }
})