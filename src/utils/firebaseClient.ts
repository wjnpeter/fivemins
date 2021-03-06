

import * as firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";
import "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyB7yHDV7BGBGo4EVs97kjD1tKO3_5xMI-s",
//   authDomain: "fivemin-fef5c.firebaseapp.com",
//   databaseURL: "https://fivemin-fef5c.firebaseio.com",
//   projectId: "fivemin-fef5c",
//   storageBucket: "fivemin-fef5c.appspot.com",
//   messagingSenderId: "867889751170",
//   appId: "1:867889751170:web:f458354c252adb19b3809b"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDz0bNgamsWr9VSdaC0BAmOAbynUBlNryo",
  authDomain: "minutes-of-me-app.firebaseapp.com",
  databaseURL: "https://minutes-of-me-app.firebaseio.com",
  projectId: "minutes-of-me-app",
  storageBucket: "minutes-of-me-app.appspot.com",
  messagingSenderId: "457390661363",
  appId: "1:457390661363:web:b4cb010d951f466e91a186",
  measurementId: "G-G94K01F2HY"
};


if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const functions = firebase.app().functions();
export const storage = firebase.app().storage();

// for local test
// functions.useFunctionsEmulator('http://localhost:5001')

export default firebase