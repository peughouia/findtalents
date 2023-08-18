 HomeRecruiter
 import React, {useState,useEffect} from 'react';
import { Text,
         View,
         Image,
         TextInput,
         StyleSheet,
         ScrollView,
         TouchableOpacity,
         RefreshControl
       } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFirestore,doc,getDoc, query, collection, where,getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app';

export default function HomeRecruiter({navigation}){

    //current user 
    const auth = getAuth()
    const currentuser = auth.currentUser;
    const [refreshing, setRefreshing] = useState(false);

    

    //firestore
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docRef = doc(db,'Users',currentuser.uid)
    const [users, setUsers] = useState(null);

    //pour profil
    const [cards, setCards] = useState([]);
    const req = query(collection(db,"Profiles"), where ("Publish","==",true));
    const [searchText, setSearchText] = useState('');


    const fetchDatas = async () => {
      try{
        const profil = []
        const querySnapshot = await getDocs(req);
        querySnapshot.forEach((doc) => {
          const {Firstname,City,LastDiploma,Profession,YearOfExp,ImageUrl,Publish} = doc.data();
          profil.push({
            id:doc.id,
            Firstname,
            City,
            LastDiploma,
            Profession,
            YearOfExp,
            ImageUrl,
            Publish
          })
      })
      setCards(profil)
      setRefreshing(false);
      console.log(profil)

        const docSnap = await getDoc(docRef);
        const userdata = docSnap.data()
        if(docSnap.exists()){
          console.log(userdata);
          setUsers(docSnap.data())
        }else{
          console.log("No such document!");
        }
      }catch(error){
        console.error('document non recuperer',error);
      }
      if (currentuser) {
        // L'utilisateur est connecté
        const userId = currentuser.uid;
        console.log('ID de l\'utilisateur courant:', userId);
      } else {
        // Aucun utilisateur connecté
        console.log('Aucun utilisateur connecté');
      }
    };

    useEffect(() => {
        fetchDatas();
    }, [])

    const handleRefresh = () => {
      setRefreshing(true);
      fetchDatas();
    };

    const filteredData = cards.filter(item =>{
      return item.Profession.toLowerCase().includes(searchText.toLowerCase())
      || item.YearOfExp.toLowerCase().includes(searchText.toLowerCase())
      || item.LastDiploma.toLowerCase().includes(searchText.toLowerCase())
      || item.City.toLowerCase().includes(searchText.toLowerCase())
    });
  

    return(
    <View style = {styles.container}>
      <View style = {styles.header}>
            <View style = {styles.profil}>
                <TouchableOpacity>
                    <Image style= {styles.img}
                    source={require("../../assets/Image/fred.jpg")}>
                    </Image>
                </TouchableOpacity>
            </View>
            <View style = {styles.titre}>
                <Text style={styles.txttitre}>FindTALENTS </Text>
            </View>
            <View style = {styles.chat}>
                <TouchableOpacity >
                <Ionicons name= "chatbubbles-outline" size = {35} color="black"/>
                </TouchableOpacity>
            </View>
      </View>

      <View style = {styles.welcom}>
      { users && (
              <Text style = {styles.txtwelcom}>Hello {users.Username}</Text>
      )}
              <Text style = {styles.txtmessage}>Find the profile you need</Text>
      </View>

      <View style = {styles.searchContainer}>
              <TextInput style = {styles.diplome}
                placeholder='search by degree, profession, city, exp..'
                value={searchText}
                onChangeText={text => setSearchText(text)}
                />
      </View>
      <ScrollView style = {styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      >
      {filteredData.map((card,index) => (
        <View key = {index}>
      <TouchableOpacity style = {styles.cards} onPress={() => navigation.navigate('renderprofil',card.id)}>
                  <View style = {styles.image}>
                      <Image style = {styles.img}
                        source={{uri:card.ImageUrl}}/>
                  </View>
                  <View style = {styles.texte}>
                      <Text style = {styles.nom}>Name: {card.Firstname}</Text>
                      <Text style = {styles.profession}>
                        Profession: {card.Profession}
                       <Text style = {styles.exp}> Since {card.YearOfExp} years Exp</Text>
                      </Text>
                      <Text style = {styles.ville}>City: {card.City}</Text>
                      <Text style = {styles.diploma}>Last Diploma: {card.LastDiploma}</Text>
                      
                  </View>
          </TouchableOpacity>
        </View>
        ))}
        <Text style = {styles.space}></Text> 
      </ScrollView> 
    </View>
  );
}



const styles = StyleSheet.create({

  scroll:{
    marginTop:10,
    backgroundColor:"#ccc"
  },
  txt:{
    fontSize:100
  },
    container:{
        flex:1,
        top:40  ,
    },
    header:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
    },
    img:{
        width:45,
        height:45,
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    profil:{
       margin:12
    },
    txttitre:{
       fontSize:25,
       fontWeight:"bold",
       color:"orangered"
    },
    chat:{
        margin:12
    },
    welcom:{
        margin:15
    },
    txtwelcom:{
        fontSize: 20,
        color:"#444262",
    },
    txtmessage:{
        fontSize:24,
        fontWeight:'bold',
        color: "#312651",
        marginTop: 8,
        top:10
    },
    searchContainer: {
        alignItems: "center",
        height:40
      },
      diplome:{
        height:40,
        borderRadius:10,
        paddingStart:10,
        fontSize:17,
        backgroundColor:"lightgray",
        width:"90%"
      },
      searchBtn: {
        width: 50,
        height: "100%",
        marginRight:10,
        backgroundColor: "orangered",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
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
      image:{
        justifyContent:'center',
      },
      img:{
        width:70,
        height:70,
        marginVertical:6,
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    texte:{
      marginLeft:13,
      alignItems:"flex-start",
      justifyContent:'center',
      width:"76%",
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
      fontSize:18,
      fontWeight:'bold'
    },
    exp:{
      fontSize:14,
      marginLeft:5,
      fontWeight:'bold'
    },
      space:{
        marginTop:100
    }
})