// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbcpPEF3T42wBtE7DKwdlBlbDEoniocJQ",
    authDomain: "court-document-management.firebaseapp.com",
    projectId: "court-document-management",
    storageBucket: "court-document-management.appspot.com",
    messagingSenderId: "172964878362",
    appId: "1:172964878362:web:5860ee73910334677a59a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);