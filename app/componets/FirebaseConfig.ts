import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDRdZd9VZV9lmXmSwfowKowPRoUPrhfH-0",
    authDomain: "canvonest.firebaseapp.com",
    projectId: "canvonest",
    storageBucket: "canvonest.appspot.com",
    messagingSenderId: "51947614484",
    appId: "1:51947614484:web:696daa9f2e7eaff5f51201",
    measurementId: "G-ECBJKSL20L"
  };


  export const FbaseApp :FirebaseApp= initializeApp(firebaseConfig);
