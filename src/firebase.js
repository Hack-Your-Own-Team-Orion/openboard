"use strict";
exports.__esModule = true;
var firebase = require("firebase/app");
require("firebase/firestore");
var options = {
    apiKey: "AIzaSyAUx1wKDe1BpYnYdsH00wIjI1CcTJFrcco",
    authDomain: "hyo-orientation.firebaseapp.com",
    databaseURL: "https://hyo-orientation.firebaseio.com",
    projectId: "hyo-orientation",
    storageBucket: "hyo-orientation.appspot.com",
    messagingSenderId: "1005871037579",
    appId: "1:1005871037579:web:991222e88779363aa7a88e"
};
firebase.initializeApp(options);
exports["default"] = firebase;
