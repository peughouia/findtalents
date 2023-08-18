import React, {useEffect, useState} from 'react';
import { View,
         Text,
         Image,
         Alert, 
         StyleSheet,
         ScrollView,
         TouchableOpacity } from 'react-native';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import * as FileSystem from 'expo-file-system'
import {shareAsync} from 'expo-sharing'

export default function RenderProfil({route}) {
     //firestore
     const app = initializeApp(firebaseConfig)
     const db = getFirestore(app)
     const idi = route.params
     const docRef = doc(db, 'Profiles',idi);
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

    const downloadPdf = async (url) => {
        if(url===""){
                Alert.alert('information!!', "aucun pdf disponible")
        }else{
        const filename = 'CV.pdf'
            const result = await FileSystem.downloadAsync(
                    url,
                    FileSystem.documentDirectory + filename
            );
                console.log(result)
                try{
                    save(result.uri);
                }catch(error){
                    console.log("erreur lors du telechargement",error)
            }
        }
       
    };

    const save = async (uri) => {
        shareAsync(uri)
        Alert.alert("information","votre fichier va etre telecharger")
    };
  return (
    <View style = {styles.container}>
        <View style = {styles.card}>
        { users && (
            <View>
            <ScrollView style ={styles.enter}>
                <View style ={styles.head}>
                    <Image style = {styles.img}
                    source={{uri:users.ImageUrl}
                    //source={require('../../assets/Image/font1.jpg')
                }/>
                    <View style ={styles.header}>
                    <Text style ={styles.txthead}>Professional</Text>
                    <Text style ={styles.txthead}>Profiles:
                    <Text style = {styles.txtpro}> {users.Profession}</Text>
                    </Text>
                    </View>
                </View>
                <View>
                    <View style = {styles.title}>
                        <Text style = {styles.txttitle}>Personal informations</Text>
                    </View>
            
                    <View>
                        <Text style = {styles.text}>Firstname :
                            <Text style = {styles.text1}> {users.Firstname}</Text> 
                        </Text>
                        <View style= {{alignItems:"center"}}><Text style = {styles.separator}></Text></View>
                    </View>

                    <View>
                        <Text style = {styles.text}>Lastname :
                            <Text style = {styles.text1}> {users.Lastname}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>

                    <View>
                        <Text style = {styles.text}>City :
                            <Text style = {styles.text1}> {users.City}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>

                    <View>
                        <Text style = {styles.text}>Language :
                            <Text style = {styles.text1}> {users.Language}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>

                    <View>
                        <Text style = {styles.text}>Phone :
                            <Text style = {styles.text1}> {users.Phone}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>
                
                    <View>
                        <Text style = {styles.text}>Email :
                            <Text style = {styles.text1}> {users.Email}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>
            
                    <View>
                        <Text style = {styles.text}>Last degree :
                            <Text style = {styles.text1}> {users.LastDiploma}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>

                    <View>
                        <Text style = {styles.text}>Profession :
                            <Text style = {styles.text1}> {users.Profession}</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>

                    <View>
                        <Text style = {styles.text}>Year of Profession :
                            <Text style = {styles.text1}> {users.YearOfExp} year(s)</Text> 
                        </Text>
                        <View><Text style = {styles.separator}></Text></View>
                    </View>
                    <View style = {styles.descript}>
                        <Text style = {styles.text}>Profil description</Text>
                        <View style = {styles.carddescript}>
                            <Text style = {styles.txtdescript}>{users.Description}</Text>
                        </View>
                    </View>
                    
                </View>
                <Text style = {styles.space}></Text> 
            </ScrollView>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.vbouton}>
                        <Text style = {styles.bouton}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.vbouton} onPress={() => downloadPdf(users.LinkPdf)}>
                        <Text style = {styles.bouton}>Download cv</Text>
                    </TouchableOpacity>
                </View>
            </View>
                )}
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"lightgray",
    },
    card:{
        margin: 10,
        padding: 10,
        borderRadius:20,
        elevation:5,
        backgroundColor:"#fff",
        shadowOffset:{width:1,height:1},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        marginVertical:45,
    
    },
    head:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:10,
       
    },
    header:{
        justifyContent:"center",
        flexGrow:1,
        width:50,
       
    },
    txthead:{
        fontWeight:"700",
        fontSize:22,
        marginLeft:8
    },
    enter:{
        marginHorizontal:10,
        marginVertical:10
    },
    img:{
        width:115,
        height:100,
        marginVertical:6,
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    text:{
        fontSize:20,
        margin:9,
        fontWeight:"bold"
    },
    text1:{
        fontSize:20,
        fontWeight:"300"
    },
    txtpro:{
        color:'orangered'
    },
    vbouton:{
        backgroundColor:"orangered",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:13,
        marginLeft:10,
        width:140,
        height:40,
        position:"relative",
    },
    bouton:{
       color:"white",
       fontSize:20,
       fontWeight:"bold",
       textAlign:"center"
    },
    bottom:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginRight:10
    },
    title:{
        backgroundColor:"lightgray",
        alignItems:'center',
        height:"6%",
        justifyContent:'center',
        marginBottom:5
    },
    txttitle:{
        fontSize:20,
        fontWeight:"bold",
        color:"orangered"
    },
    separator:{
        height: 1,
        width: '100%',
        backgroundColor: 'lightgray',
    },
    descript:{
        alignItems:"center"
    },
    txtdescript:{
        margin:10,
        fontSize:18,
        fontWeight:"400"
    },
    carddescript:{
        borderRadius:20,
        elevation:3,
        backgroundColor:"#ccc",
        shadowOffset:{width:0,height:2},
        shadowColor:"black",
        shadowOpacity:0.9,
        shadowRadius:2,
    },
    space:{
        marginTop:20
    }
})