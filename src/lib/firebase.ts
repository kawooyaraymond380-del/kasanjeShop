// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "kasanje-ai-market",
  "appId": "1:155242261249:web:d423cc9a1ba3ddbb9dc900",
  "storageBucket": "kasanje-ai-market.firebasestorage.app",
  "apiKey": "AIzaSyDghBgLwFJuA6OzjeFwUL0Yvoqpeu_2dIs",
  "authDomain": "kasanje-ai-market.firebaseapp.com",
  "messagingSenderId": "155242261249"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };