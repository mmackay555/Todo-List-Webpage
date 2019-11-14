import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDZ0Pgj0ScDQtsTpvDHWnOKFrXG_wE4RKI",
    authDomain: "todo-rrf-316-b7cc3.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-b7cc3.firebaseio.com",
    projectId: "todo-rrf-316-b7cc3",
    storageBucket: "todo-rrf-316-b7cc3.appspot.com",
    messagingSenderId: "12356735430",
    appId: "1:12356735430:web:b8a231d27f26cba825a2c7",
    measurementId: "G-53KEM5MZ81"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;