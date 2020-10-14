import firebase from "firebase";

const { firebaseApiKey } = require("./keys");

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "mechascord.firebaseapp.com",
  databaseURL: "https://mechascord.firebaseio.com",
  projectId: "mechascord",
  storageBucket: "mechascord.appspot.com",
  messagingSenderId: "995903292907",
  appId: "1:995903292907:web:a45ab0b4a690da702d05ae",
  measurementId: "G-MKTJEQJBDB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
