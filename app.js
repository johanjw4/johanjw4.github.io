import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';  // Zorg ervoor dat je firebase-config.js importeert

// Firebase initialisatie
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

// Inloggen
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Ingelogd als:", user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Inlogfout:", errorCode, errorMessage);
      alert("Inloggen mislukt: " + errorMessage); // Toon een alert bij fout
    });
}

// Uitloggen
function logout() {
  signOut(auth)
    .then(() => {
      console.log("Uitgelogd");
    })
    .catch((error) => {
      console.error("Uitlogfout:", error.message);
    });
}

// Loginformulier
document.querySelector('#login-form button').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

// Luister naar de inlogstatus van de gebruiker
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Ingelogd als:", user.email);
    // Toon het ID-paneel als de gebruiker is ingelogd
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('id-panel').style.display = 'block';
    getIds();  // Haal de IDs op uit de database
  } else {
    console.log("Niet ingelogd");
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('id-panel').style.display = 'none';
  }
});
