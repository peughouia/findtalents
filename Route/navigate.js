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
import UpdateProfil from "../App/Candidate/UpdateProfil";
import RenderProfil from "../App/Candidate/RenderProfil";
import Transit from "../App/Auth/Transit";
import SourcePage from "../App/Candidate/test1";
import Curriculum from "../App/Candidate/Curriculum";
import ModelScreen from "../App/Candidate/Cv/ModelScreen";

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

                <Stack.Screen component={HomeCan} name="home"
                    options={{ headerShown:false}}/>

                <Stack.Screen component={Profile} name="profile"
                    options={{ headerShown:false}}/>
                    
                <Stack.Screen component={Addprofile} name="addprofile"
                     options={{ headerShown:false}}/>

                <Stack.Screen component={RenderProfil} name="renderprofil"
                     options={{ headerShown:false}}/> 

                <Stack.Screen component={SourcePage} name="sourcepage"
                     options={{ headerShown:false}}/>   

                <Stack.Screen component={UpdateProfil} name="updateprofil"
                     options={{ headerShown:false}}/>   

                <Stack.Screen component={Transit} name="transit"
                     options={{ headerShown:false}}/> 

                <Stack.Screen component={Curriculum} name="curriculum"
                     options={{ headerShown:false}}/> 

                <Stack.Screen component={ModelScreen} name="modelscreen"
                     options={{ headerShown:false}}/> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}