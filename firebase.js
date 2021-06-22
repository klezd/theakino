/* eslint-disable no-undef */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// FIREBASE
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firebaseDb = firebase.database();
export const firebaseAuth = firebase.auth();

export const firebaseApp = firebase.app();
export default firebase;
