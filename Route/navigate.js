import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Connexion from "../App/Auth/Connexion";
import Register from "../App/Auth/Register";
import HomeCandidate from "../App/Candidate/HomeCandidate";
import HomeRecruiter from "../App/Recruiter/HomeRecruiter";


const Stack = createNativeStackNavigator()

export default function Screenview(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="connexion">

                <Stack.Screen component={Connexion} name="connexion"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={Register}  name="register"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={HomeCandidate} name="homecandidate"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={HomeRecruiter} name="homerecruiter"
                    options={{ headerShown:false }}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}