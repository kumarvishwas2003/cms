import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDIpkiQLSEWaE7sjg9Ht8TaOCgTUAlI00",
  authDomain: "content-management-syste-5a34e.firebaseapp.com",
  projectId: "content-management-syste-5a34e",
  storageBucket: "content-management-syste-5a34e.firebasestorage.app",
  messagingSenderId: "676223872976",
  appId: "1:676223872976:web:249afc2dd727655396d3d5",
  measurementId: "G-7XPPJGJ78N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }