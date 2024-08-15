// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACaYqNtMOjOvUNMaYQ1ukwvorO9VQa0RA",
  authDomain: "productsshowcase-c1bf2.firebaseapp.com",
  projectId: "productsshowcase-c1bf2",
  storageBucket: "productsshowcase-c1bf2.appspot.com",
  messagingSenderId: "103177833567",
  appId: "1:103177833567:web:9cf17951a9ac5c094edfea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;