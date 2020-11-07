import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyA4N61eJvni0PeYaeEeaHPr41vorHiH2k0",
  authDomain: "shoping-app-c16cd.firebaseapp.com",
  databaseURL: "https://shoping-app-c16cd.firebaseio.com",
  projectId: "shoping-app-c16cd",
  storageBucket: "shoping-app-c16cd.appspot.com",
  messagingSenderId: "177823604024",
  appId: "1:177823604024:web:1a5182d1a77b2b0b1e35cd",
  measurementId: "G-8PKCYRMR5G",
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

// firebase.initializeApp(config);
// export default firebase;
