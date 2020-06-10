

import * as firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS0EyVPaX1nPiznJJpA9EzRz8CDW3-Og8",
  authDomain: "cubage-22484.firebaseapp.com",
  databaseURL: "https://cubage-22484.firebaseio.com",
  projectId: "cubage-22484",
  storageBucket: "cubage-22484.appspot.com",
  messagingSenderId: "890109238125",
  appId: "1:890109238125:web:aced8d4da556b24c9d5864"
};


if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const functions = firebase.app().functions();

// for local test
// functions.useFunctionsEmulator('http://localhost:5001')

export default firebase