import * as firebase from "firebase/app";
import "firebase/firestore";

let options: Object = {
    apiKey: "AIzaSyAUx1wKDe1BpYnYdsH00wIjI1CcTJFrcco",
    authDomain: "hyo-orientation.firebaseapp.com",
    databaseURL: "https://hyo-orientation.firebaseio.com",
    projectId: "hyo-orientation",
    storageBucket: "hyo-orientation.appspot.com",
    messagingSenderId: "1005871037579",
    appId: "1:1005871037579:web:991222e88779363aa7a88e"
};

firebase.initializeApp(options);

export default firebase;