import firebase from 'firebase';
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAJ0dTYcdpr2P6SnN-VYRe5h4LWA5vkicE",
    authDomain: "chat-app-c06e3.firebaseapp.com",
    projectId: "chat-app-c06e3",
    storageBucket: "chat-app-c06e3.appspot.com",
    messagingSenderId: "117264874605",
    appId: "1:117264874605:web:7263571e31e033a2521364",
    measurementId: "G-VJY8TVZR0H"
})

const db=firebaseApp.firestore();
const storage=firebase.storage();

export {db,storage}