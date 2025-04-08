// Firebase-configuratie
const firebaseConfig = {
  apiKey: "jouw-api-key",
  authDomain: "jouw-project-id.firebaseapp.com",
  projectId: "jouw-project-id",
  storageBucket: "jouw-project-id.appspot.com",
  messagingSenderId: "jouw-messaging-sender-id",
  appId: "jouw-app-id",
  measurementId: "jouw-measurement-id"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
