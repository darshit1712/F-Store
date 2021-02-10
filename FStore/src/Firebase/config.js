import firebase from 'firebase';

const firebaseapp=firebase.initializeApp({
    apiKey: "AIzaSyBji7LVUAzlRC-rJwItVfMJHNhBo0VPMmY",
    authDomain: "f-store-ca8e4.firebaseapp.com",
    databaseURL: "https://f-store-ca8e4-default-rtdb.firebaseio.com",
    projectId: "f-store-ca8e4",
    storageBucket: "f-store-ca8e4.appspot.com",
    messagingSenderId: "172740045702",
    appId: "1:172740045702:web:cd4a11f7e5a2f1dc619a07",
    measurementId: "G-BB3M5C3JHL"
});
var db = firebaseapp.firestore();
export {db};