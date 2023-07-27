import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfigs = {
    apiKey: "AIzaSyAZyCKgQj9XUYjbTdUaqGOKKB-hZkLM7SI",
    authDomain: "findtalents-cf59a.firebaseapp.com",
    projectId: "findtalents-cf59a",
    storageBucket: "findtalents-cf59a.appspot.com",
    messagingSenderId: "1037689135812",
    appId: "1:1037689135812:web:d58c1533d17aeb0fbf5f91"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfigs);
}

export{firebase}