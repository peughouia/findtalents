import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Connexion from "../App/Auth/Connexion";
import Register from "../App/Auth/Register";
import HomeCandidate from "../App/Candidate/HomeCandidate";
import HomeRecruiter from "../App/Recruiter/HomeRecruiter";
import HomeCan from "../App/Candidate/HomeCan";
import Profile from "../App/Candidate/Profile";
import Addprofile from "../App/Candidate/addprofile";
import RenderProfil from "../App/Candidate/RenderProfil";
import Test from "../App/Candidate/tes";
import Test1 from "../App/Candidate/test1";
import AddCardScreen from "../App/Candidate/test2";

const Stack = createNativeStackNavigator()


export default function Screenview(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="homecandidate">

                <Stack.Screen component={Connexion} name="connexion"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={Register}  name="register"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={HomeCandidate} name="homecandidate"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={HomeRecruiter} name="homerecruiter"
                    options={{ headerShown:false }}/>

                <Stack.Screen component={HomeCan} name="homecan"
                    options={{ headerShown:false}}/>

                <Stack.Screen component={Profile} name="profile"
                    options={{ headerShown:false}}/>
                    
                <Stack.Screen component={Addprofile} name="addprofile"
                     options={{ headerShown:false}}/>

                <Stack.Screen component={RenderProfil} name="renderprofil"
                     options={{ headerShown:false}}/> 

                <Stack.Screen component={Test} name="test"
                     options={{ headerShown:false}}/>   

                <Stack.Screen component={Test1} name="test1"
                     options={{ headerShown:false}}/>  

                <Stack.Screen component={AddCardScreen} name="test2"
                     options={{ headerShown:false}}/>    
            </Stack.Navigator>
        </NavigationContainer>
    )
}