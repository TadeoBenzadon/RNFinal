import app from 'firebase/app';
import firebase from 'firebase';

//Aca va la constante de la config de firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCbKSGKitDx1_T9xhVKDo3YfNvhrro-3Qc",
  authDomain: "reactnative-final-24045.firebaseapp.com",
  projectId: "reactnative-final-24045",
  storageBucket: "reactnative-final-24045.appspot.com",
  messagingSenderId: "746629465497",
  appId: "1:746629465497:web:d5390938dfe4bc960b3f08"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();   //authentication
export const storage = app.storage();  //storage
export const db = app.firestore();     //data base