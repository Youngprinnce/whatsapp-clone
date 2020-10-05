// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyB8vWuasLPI7wZ4uKvStmHoWaYZfkzphFk",
  authDomain: "whatsapp-clone-e01ff.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-e01ff.firebaseio.com",
  projectId: "whatsapp-clone-e01ff",
  storageBucket: "whatsapp-clone-e01ff.appspot.com",
  messagingSenderId: "166933101990",
  appId: "1:166933101990:web:2b19b043e0f91195f16367",
  measurementId: "G-WC4BJG2BP1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };


