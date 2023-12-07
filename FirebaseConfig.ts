// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlJxRtEYasuCDr3W4YcuNeZMZENBWN0NI",
  authDomain: "wcdonald-s-ordering-app.firebaseapp.com",
  projectId: "wcdonald-s-ordering-app",
  storageBucket: "wcdonald-s-ordering-app.appspot.com",
  messagingSenderId: "464654276287",
  appId: "1:464654276287:web:17aed76999fc38770cd80a",
  measurementId: "G-C3STJLE0XE"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)