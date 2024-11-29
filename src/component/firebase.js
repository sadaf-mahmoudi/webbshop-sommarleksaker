import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGQjPtqGf0wWqSYLG_n-O4QhRVqvyHcVE",
    authDomain: "webbshop-sommarleksaker.firebaseapp.com",
    projectId: "webbshop-sommarleksaker",
    storageBucket: "webbshop-sommarleksaker.appspot.com",
    messagingSenderId: "87780959452",
    appId: "1:87780959452:web:5e137d3fec596064dfc019"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };