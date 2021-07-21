import firebase from 'firebase/app';

import "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
     apiKey: "AIzaSyAjDvl1129AfdCip2uz3SCMGa7nXK9XsPk",
    authDomain: "imagestore-aad6b.firebaseapp.com",
    projectId: "imagestore-aad6b",
    storageBucket: "imagestore-aad6b.appspot.com",
    messagingSenderId: "94113442479",
    appId: "1:94113442479:web:ce476fe2d86e0a3607025a",
    measurementId: "G-5FYWSR674T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;