import { View,Text,Image,StyleSheet,ScrollView, TouchableOpacity } from 'react-native'
import React , { useState,useEffect }from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MaterialIcons, Fontisto,FontAwesome5 } from '@expo/vector-icons';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../../config/firebase';
import { initializeApp } from 'firebase/app';


export default function CvTalent1({route}) {

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const idi = route.params
    const docRef = doc(db, 'Cv',idi);
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
        };
        fetchDatas();
    }, []);

  return (
    <View style={styles.container}>
        <View style={styles.card}>
            {users && (

           
            <ScrollView>
            <View style = {styles.head}>
                <Image style = {styles.img} 
                source={{uri:users.UrlImage}}/>
                <View style = {styles.nomposte}>
                    <Text style = {styles.txtnom}>{users.Name}</Text>
                    <Text style = {styles.txtmetier}>{users.Profession}</Text>
                </View>
            </View>
            
            <View style ={styles.corp}>
                <View style = {styles.column1}>
                    <View style = {styles.profil}>
                        <Text style = {styles.txtprofil}>Profil</Text>
                        <Text>{users.Profil}</Text>
                    </View>
                    <View style = {styles.contact}>
                        <Text style = {styles.txtprofil}>Contact</Text>

                        <Ionicons name="ios-call-outline" size={15} color="black" >
                            <Text> Tel: {users.Phone}</Text>
                        </Ionicons>

                        <View style= {styles.contactes}>
                        <MaterialIcons name="place" size={15} color='black'/>
                        <Text>  {users.Adresse}</Text>
                        </View>
                        <Ionicons name="mail-outline" size={15} color="black">
                            <Text>  {users.Email}</Text>
                        </Ionicons>
                        
                    </View>
                    <View style = {styles.contact}>
                        <Text style = {styles.txtprofil}>Competence</Text>
                        <Text>{users.Competence}...{users.LevelComp}/10</Text>
                    </View>
                    <View style = {styles.contact}>
                        <Text style = {styles.txtprofil}>Language</Text>
                        <Text> - {users.language} </Text>
                    </View>
                </View>
                <View style = {styles.column2}>
                    <View style = {styles.experience}>
                        <Text style = {styles.txtexperience}>Experiences professionnelle</Text>
                        <Text style = {styles.txtposte}> {users.Poste}</Text>
                        <Text> {users.Workplace} |  {users.StartExp} - {users.EndExp} </Text>
                        <Text> {users.Description}</Text>
                    </View>
                    <View style = {styles.formation}>
                        <Text style = {styles.txtformation}>Formation</Text>
                        <Text style = {styles.txtposte}> {users.Diploma}</Text>
                        <Text> {users.School}</Text>
                        <Text> {users.StartFormation} - {users.EndFormation}</Text>
    
                    </View>
                </View>
            </View>
            <View style = {styles.foot}>
                <Text style = {styles.curiculum}>CURICULUM VITAE</Text>
            </View>
            <View style = {styles.space}></View>
            </ScrollView>
             )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"lightgray"

    },
    card:{
        width:"95%",
        height:"82%",
        backgroundColor:"white",
        elevation:20,
        shadowOffset:{width:1,height:10},
        shadowColor:"#333",
        shadowOpacity:0.9,
        shadowRadius:4,
        borderRadius:20,
    },
    head:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:15,
        marginLeft:15,
        marginRight:15,
        height:"15%"
    },
    img:{
        width:100,
        height:100,
        resizeMode: 'cover',
        borderRadius: 52,
        backgroundColor: 'gray',
        marginLeft:15,
    },
    nomposte:{
        justifyContent:"center",
        width:"60%",
    },
    corp:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:5,
        marginLeft:15,
        marginRight:15,
    },

    column1:{
        marginTop:10,
    },

    column2:{
        marginTop:10,
    },
    profil:{
        width:146,
    },

    contact:{
        width:146,
        marginTop:25
    },

    experience:{
        width:180,
    },

    formation:{
        width:180,
        marginTop:35
    },

    txtprofil:{
        fontSize:21,
        fontWeight:'bold',
        width:145,
        height:30,
        color:'orangered',
        backgroundColor:'lightgray'
    },
    curiculum:{
        fontSize:21,
        fontWeight:'bold',
        color:'orangered',
        backgroundColor:'lightgray'
    },
    foot:{
        alignItems:"center",
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'lightgray',
    },
    txtexperience:{
        fontSize:15,
        fontWeight:'bold',
        width:180,
        height:45,
        color:'orangered',
        backgroundColor:'lightgray'
    },
    txtformation:{
        fontSize:25,
        fontWeight:'bold',
        width:180,
        height:35,
        color:'orangered',
        backgroundColor:'lightgray'
    },
    txtposte:{
        fontWeight:"bold",
        marginTop:5,
    },
    txtnom:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:8,
    },
    txtmetier:{
        marginLeft:8,
    },
    space:{
        marginTop:70
    },
    use:{
        alignItems:'center',
        marginTop:15,
        height:30,
        width:'90%',
        backgroundColor:'orangered',
        elevation:5,
        shadowOffset:{width:1,height:2},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        fontWeight:"bold",
    },
    txtuse:{
        fontSize:20,
        fontWeight:"bold",
        color:'white'
    },
    contactes:{
        flexDirection:"row"
    }
})

