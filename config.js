import * as firebase from "firebase"
require("@firebase/firestore")
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD1FqDS_E3Dwje8Z0SU93Zc8P9w3X9Ub3A",
    authDomain: "library-51d27.firebaseapp.com",
    databaseURL: "https://library-51d27.firebaseio.com",
    projectId: "library-51d27",
    storageBucket: "library-51d27.appspot.com",
    messagingSenderId: "532344128716",
    appId: "1:532344128716:web:ad4b92874ab4987e432e69"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()
