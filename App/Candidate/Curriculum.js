import { View, Text,Image, StyleSheet,ScrollView,RefreshControl,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Curriculum({navigation}) {

    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
        setRefreshing(false);
      };

  return (
    <View style = {styles.container}>
        <View style = {styles.head}>
        <View style = {styles.log}>
            <Image style = {styles.logo} source={require("../../assets/Image/FindTalentsred1.jpg")}/>
            <Text style={styles.title}>CV</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('modelscreen')}>
          <Ionicons name= "add-circle-outline" size = {45} color="black"/>
        </TouchableOpacity>
      </View>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }>

        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"lightgray",
        flex:1,
    },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        height: 125,
        padding: 20,
      },
    log:{
        flexDirection:'row'
    },
        logo:{
        width:90,
        height:50,
        marginVertical:6,
        resizeMode: 'cover',
        borderRadius: 20,
        },
    title:{
        color: 'orangered',
        fontSize: 45,
        fontWeight: 'bold',
        marginLeft:10,
          },
})