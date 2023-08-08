import * as React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
//importationde liaison 
import Profile from "./Profile";
import HomeCan from "./HomeCan";
import Curriculum from "./Curriculum";
import SourcePage from "./test1";


const tab = createBottomTabNavigator();

export default function HomeCandidate({navigation}){
    return(
        <tab.Navigator
            initialRouteName="homecan"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName ;
                    if (route.name == "CV"){
                        iconName = focused ? "document" : "document-outline"
                    }else if(route.name == "home"){
                        iconName = focused ? 'home' : 'home-outline';
                    }else if(route.name == "Profil"){
                        iconName = focused ? "clipboard" : "clipboard-outline"
                    }
                    return <Ionicons name={iconName} size={30} color={"orangered"}/>
                }
            })}>

            <tab.Screen name ='CV' component={Curriculum} 
                options={{ headerShown:false }}/>
            <tab.Screen name ='home' component={HomeCan} 
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