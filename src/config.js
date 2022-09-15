//importing firebase SDK 
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';    

const firebaseConfig = {
    apiKey: "AIzaSyBH7joPSyeBK3dBvp6qCQjgdhzMnbBBkgE",
    authDomain: "gochat23.firebaseapp.com",
    databaseURL: "https://gochat23-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gochat23",
    storageBucket: "gochat23.appspot.com",
    messagingSenderId: "75754710360",
    appId: "1:75754710360:web:cdd7b21db0ad77ec9ab12d"
  }; 

firebase.initializeApp(firebaseConfig) 

// initialize the firebase sdk & services   

export const projectAuth = firebase.auth()
export const projectFirestore = firebase.firestore()