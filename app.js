import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db } from './firebase-config.js';

const idsRef = collection(db, "ids"); // Verwijzing naar de 'ids' collectie

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginForm.style.display = "none";
    mainPanel.style.display = "block";
    await loadIDs(); // Laad de ID's nadat de gebruiker is ingelogd
  } else {
    loginForm.style.display = "block";
    mainPanel.style.display = "none";
  }
});

// ID toevoegen
addIdBtn.addEventListener('click', async () => {
  const naam = nameInput.value.trim();
  const nummer = numberInput.value.trim();
  const passcode = passcodeInput.value.trim();

  if (naam && nummer && passcode) {
    try {
      // Voeg de nieuwe ID toe aan Firestore
      await addDoc(idsRef, { naam, nummer, passcode });
      
      // Leeg de inputvelden
      nameInput.value = "";
      numberInput.value = "";
      passcodeInput.value = "";

      // Na toevoegen, de lijst opnieuw laden
      await loadIDs(); // Dit is je functie om de ID's op te halen
    } catch (err) {
      console.error("Fout bij toevoegen:", err.message);
    }
  }
});

// Functie om de huidige ID's op te halen en weer te geven
async function loadIDs() {
  const querySnapshot = await getDocs(idsRef);
  idList.innerHTML = ""; // Maak de lijst leeg voordat je opnieuw toevoegt

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      ${data.naam} - ${data.nummer} - ${data.passcode}
      <button data-id="${doc.id}">Verwijder</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      deleteID(doc.id); // Verwijder de ID uit Firestore
    });
    idList.appendChild(li);
  });
}

// Functie om ID te verwijderen uit Firestore
async function deleteID(id) {
  const docRef = doc(db, "ids", id);
  await deleteDoc(docRef);
  await loadIDs(); // Herlaad de lijst na verwijdering
}
