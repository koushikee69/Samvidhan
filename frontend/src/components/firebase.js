// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpWx2bTXskJKGmIuSeE7uHRGvzGhyr0YA",
    authDomain: "samvidhan-try-01.firebaseapp.com",
    projectId: "samvidhan-try-01",
    storageBucket: "samvidhan-try-01.appspot.com",
    messagingSenderId: "810519238050",
    appId: "1:810519238050:web:22d95bf1ed90c3a5ac4efb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app