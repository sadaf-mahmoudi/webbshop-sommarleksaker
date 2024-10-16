import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DIN_PROJECT_ID.firebaseapp.com",
  projectId: "DIN_PROJECT_ID",
  storageBucket: "DIN_PROJECT_ID.appspot.com",
  messagingSenderId: "DIN_SENDER_ID",
  appId: "DIN_APP_ID"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
