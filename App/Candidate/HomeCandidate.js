import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet,Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Connexion from "../Auth/Connexion";
import Profile from "./Profile";
import HomeCan from "./HomeCan";

const tab = createBottomTabNavigator();

export default function HomeCandidate({Navigation}){
    return(
                    <tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName ;

                            if (route.name == "CV"){
                                iconName = focused ? "document" : "document-outline"
                            }else if(route.name == "homecan"){
                                iconName = focused ? 'home' : 'home-outline';
                            }else if(route.name == "Profil"){
                                iconName = focused ? "clipboard" : "clipboard-outline"
                            }
                            return <Ionicons name={iconName} size={30} color={"orangered"}/>
                        }
                    })}
                    initialRouteName="homecan">
                        <tab.Screen name ='CV' component={Connexion} 
                            options={{ headerShown:false }}/>
                        <tab.Screen name ='homecan' component={HomeCan} 
                            options={{ headerShown:false }}/>
                        <tab.Screen name ='Profil' component={Profile} 
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