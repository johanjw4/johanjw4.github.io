// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5ae1DTNSbY2xD81O_o8T3RR2HD8HdBA4",
  authDomain: "johanjw4-github.firebaseapp.com",
  projectId: "johanjw4-github",
  storageBucket: "johanjw4-github.firebasestorage.app",
  messagingSenderId: "715286980100",
  appId: "1:715286980100:web:3e279004a9552f0362f751",
  measurementId: "G-G6SEDX6Q3V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
