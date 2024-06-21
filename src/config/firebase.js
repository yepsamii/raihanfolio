import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAwxAQLxqUhOexIrOd43V0HPx_QOf-Dpb8",
    authDomain: "raihanfolio-731d6.firebaseapp.com",
    projectId: "raihanfolio-731d6",
    storageBucket: "raihanfolio-731d6.appspot.com",
    messagingSenderId: "758337266327",
    appId: "1:758337266327:web:7a2f1cd80ac01643a63fd2",
    measurementId: "G-J9285WXVY2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);