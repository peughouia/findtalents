import React, {useState,useEffect} from 'react';
import { Text,
         View,
         Image,
         TextInput,
         StyleSheet,
         TouchableOpacity,
       } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFirestore,doc,getDoc, query, collection, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../config/firebase'
import { initializeApp } from 'firebase/app';

export default function HomeCan({navigation}){

    //current user 
    const auth = getAuth()
    const currentuser = auth.currentUser;
    //firestore
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docRef = doc(db,'Users',currentuser.uid)
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchDatas = async () => {
          try{
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
        fetchDatas();
    }, [])

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
            <Text style = {styles.txtmessage}>create and post your Profile Pro</Text>
    </View>

      

      <View style = {styles.searchContainer}>
        
          <View style = {styles.searchWrapper}>
              <TextInput style = {styles.searchInput}
                //value=""
                onChange={() => {}}
                placeholder='search for one of your profiles'/>
          </View>

          <TouchableOpacity style = {styles.searchBtn} onPress={() => {}}>
             <Ionicons name= "search-outline" size = {35} color="white"/>
          </TouchableOpacity>

      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({

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
        marginTop: 5,
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop:20,
        height: 50,
      },
      searchWrapper: {
        flex: 1,
        backgroundColor: "#ccc",
        marginRight:10,
        marginLeft:12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: "100%",
      },
      searchInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal:16,
      },
      searchBtn: {
        width: 50,
        height: "100%",
        marginRight:10,
        backgroundColor: "orangered",
        //backgroundColor: "#FF7754",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
      },
})