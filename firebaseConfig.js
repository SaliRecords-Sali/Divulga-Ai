import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDspoK3za4EXO3a83g5PMIOPGvlDcFTBAM",
    authDomain: "divulga-ai.firebaseapp.com",
    projectId: "divulga-ai",
    storageBucket: "divulga-ai.appspot.com",
    messagingSenderId: "1067959392509",
    appId: "1:1067959392509:web:7bec6a4de723a9690c0694",
    measurementId: "G-M1442EH2BG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.firestore();

  export default firebase;