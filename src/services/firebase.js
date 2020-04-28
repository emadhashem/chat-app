import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyA0QRZ2YfFOd1pj5xclKCwUARn_6SDEjIU",
    authDomain: "chat-app-6a76d.firebaseapp.com",
    databaseURL: "https://chat-app-6a76d.firebaseio.com",
    projectId: "chat-app-6a76d",
    storageBucket: "chat-app-6a76d.appspot.com",
    messagingSenderId: "543630805152",
    appId: "1:543630805152:web:41074cf9661812da61e1c5",
    measurementId: "G-HEEQDYTNT5"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

// import firebase from 'react-native-firebase'
// const firebaseConfig = {
//     apiKey: "AIzaSyA0QRZ2YfFOd1pj5xclKCwUARn_6SDEjIU",
//     authDomain: "chat-app-6a76d.firebaseapp.com",
//     databaseURL: "https://chat-app-6a76d.firebaseio.com",
//     projectId: "chat-app-6a76d",
//     storageBucket: "chat-app-6a76d.appspot.com",
//     messagingSenderId: "543630805152",
//     appId: "1:543630805152:web:41074cf9661812da61e1c5",
//     measurementId: "G-HEEQDYTNT5"
// };
// firebase.initializeApp(firebaseConfig);