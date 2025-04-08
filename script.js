// Firebase-configuratie en import van Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Firebase-configuratie
const firebaseConfig = {
  apiKey: "AIzaSyB5ae1DTNSbY2xD81O_o8T3RR2HD8HdBA4",
  authDomain: "johanjw4-github.firebaseapp.com",
  projectId: "johanjw4-github",
  storageBucket: "johanjw4-github.firebasestorage.app",
  messagingSenderId: "715286980100",
  appId: "1:715286980100:web:3e279004a9552f0362f751",
  measurementId: "G-G6SEDX6Q3V"
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Inlog functionaliteit en DOM interactie
document.addEventListener("DOMContentLoaded", () => {
    const loginPanel = document.getElementById("login-panel");
    const mainPanel = document.getElementById("main-panel");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    const usernameDisplay = document.getElementById("username-display");
    const itemsList = document.getElementById("items-list");

    // Controleer of gebruiker al ingelogd is
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainPanel();
    }

    // Inloggen via gebruikersnaam en wachtwoord
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = `${username}@example.com`;  // Gebruikersnaam als e-mail

        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("isLoggedIn", "true");
            showMainPanel();
        } catch (error) {
            loginError.textContent = "Ongeldige gebruikersnaam of wachtwoord.";
        }
    });

    // Toon het hoofdscherm na inloggen
    function showMainPanel() {
        loginPanel.style.display = "none";
        mainPanel.style.display = "block";

        const user = auth.currentUser;
        usernameDisplay.textContent = user.displayName || user.email.split('@')[0]; // Toon gebruikersnaam

        loadItems();

        // Uitloggen
        document.getElementById("logout-btn").addEventListener("click", async () => {
            await signOut(auth);
            localStorage.removeItem("isLoggedIn");
            location.reload();
        });
    }

    // Lijst met items laden uit Firestore
    async function loadItems() {
        itemsList.innerHTML = '';
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
            addItemToDOM(doc.id, doc.data());
        });
    }

    // Item toevoegen aan Firestore
    document.getElementById("add-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const naam = document.getElementById("naam").value;
        const beschrijving = document.getElementById("beschrijving").value;
        const status = document.getElementById("status").value;

        try {
            const docRef = await addDoc(collection(db, "items"), {
                naam,
                beschrijving,
                status
            });
            addItemToDOM(docRef.id, { naam, beschrijving, status });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    });

    // Voeg item toe aan de DOM
    function addItemToDOM(id, itemData) {
        const item = document.createElement("li");
        item.innerHTML = `
            <div class="string">Naam: ${itemData.naam}</div>
            <div class="string">Beschrijving: ${itemData.beschrijving}</div>
            <div class="string">Status: ${itemData.status}</div>
            <button class="remove-btn" data-id="${id}">Verwijderen</button>
        `;

        item.querySelector(".remove-btn").addEventListener("click", async () => {
            await deleteDoc(doc(db, "items", id));
            item.remove();
        });

        itemsList.appendChild(item);
    }
});
