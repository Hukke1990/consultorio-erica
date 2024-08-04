// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc5yYix8jN7GbrybOHTWAaLQREn_S29io",
  authDomain: "consultorio-erica.firebaseapp.com",
  projectId: "consultorio-erica",
  storageBucket: "consultorio-erica.appspot.com",
  messagingSenderId: "537526543657",
  appId: "1:537526543657:web:511552e70f8a6ee5bd0338"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;