import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

// Elements
const loginForm = document.getElementById('login-form');
const mainPanel = document.getElementById('main-panel');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorDisplay = document.getElementById('login-error');

const nameInput = document.getElementById('name-input');
const numberInput = document.getElementById('number-input');
const passcodeInput = document.getElementById('passcode-input');
const addIdBtn = document.getElementById('add-id-btn');
const idList = document.getElementById('id-list');

const idsRef = collection(db, "ids");

function show(ids) {
  idList.innerHTML = "";
  ids.forEach(docSnap => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.innerHTML = `
      ${data.naam} - ${data.nummer} - ${data.passcode}
      <button data-id="${docSnap.id}">Verwijder</button>
    `;
    li.querySelector("button").onclick = async () => {
      await deleteDoc(doc(idsRef, docSnap.id));
      loadIDs();
    };
    idList.appendChild(li);
  });
}

async function loadIDs() {
  const snapshot = await getDocs(idsRef);
  show(snapshot.docs);
}

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    errorDisplay.textContent = "Login mislukt: " + error.message;
  }
});

logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
});

addIdBtn.addEventListener('click', async () => {
  const naam = nameInput.value;
  const nummer = numberInput.value;
  const passcode = passcodeInput.value;

  if (naam && nummer && passcode) {
    await addDoc(idsRef, { naam, nummer, passcode });
    nameInput.value = "";
    numberInput.value = "";
    passcodeInput.value = "";
    loadIDs();
  }
});

onAuthStateChanged(auth, user => {
  if (user) {
    loginForm.style.display = "none";
    mainPanel.style.display = "block";
    loadIDs();
  } else {
    loginForm.style.display = "block";
    mainPanel.style.display = "none";
  }
});
