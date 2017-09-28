
import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxgxzvKf2lv7aWuKmUdAh7P3DgW8RB3zo",
    authDomain: "pattisapp-joahog.firebaseapp.com",
    databaseURL: "https://pattisapp-joahog.firebaseio.com",
    projectId: "pattisapp-joahog",
    storageBucket: "pattisapp-joahog.appspot.com",
    messagingSenderId: "304238239289"
  };
  firebase.initializeApp(config);

export default firebase;