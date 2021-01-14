import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA85WpHh_KyZcfcIptyjF8PAZ1UlQHjKgA",
    authDomain: "clone-a36a6.firebaseapp.com",
    projectId: "clone-a36a6",
    storageBucket: "clone-a36a6.appspot.com",
    messagingSenderId: "469139274342",
    appId: "1:469139274342:web:a084e994554d0453a50ba7",
    measurementId: "G-TV5DQL1RN0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };