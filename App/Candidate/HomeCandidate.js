import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet,Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Connexion from "../Auth/Connexion";
import Register from "../Auth/Register";

const tab = createBottomTabNavigator();

export default function HomeCandidate({Navigation}){
    return(
                    <tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName ;

                            if (route.name == "connexion"){
                                iconName = focused ? 'home' : 'home-outline';
                            }else if(route.name == "register"){
                                iconName = focused ? "document" : "document-outline"
                            }
                            return <Ionicons name={iconName} size={30} color={"red"}/>
                        }
                    })}
                    >
                        <tab.Screen name ='connexion' component={Connexion} 
                            options={{ headerShown:false }}/>
                        <tab.Screen name ='register' component={Register} 
                            options={{ headerShown:false }}/>
                    </tab.Navigator>
    );

}


const styles = StyleSheet.create({

container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
},
});