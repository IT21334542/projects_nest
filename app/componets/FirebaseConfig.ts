import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_G_ID,
  authDomain: "canvonestv2.firebaseapp.com",
  projectId: "canvonestv2",
  storageBucket: "canvonestv2.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};



  export const FbaseApp :FirebaseApp= initializeApp(firebaseConfig);
