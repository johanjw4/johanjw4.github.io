import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

// 🔁 Lokaal ID geheugen
let ids = [];

// 🔒 Firebase login
loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    errorDisplay.textContent = "";
  } catch (error) {
    errorDisplay.textContent = "Login mislukt: " + error.message;
  }
});

logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
});

// 🆕 ID toevoegen
addIdBtn.addEventListener('click', () => {
  const naam = nameInput.value.trim();
  const nummer = numberInput.value.trim();
  const passcode = passcodeInput.value.trim();

  if (naam && nummer && passcode) {
    ids.push({ naam, nummer, passcode });
    nameInput.value = "";
    numberInput.value = "";
    passcodeInput.value = "";
    renderIDs();
  }
});

// 🔄 ID lijst tonen
function renderIDs() {
  idList.innerHTML = "";

  ids.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.naam} - ${item.nummer} - ${item.passcode}
      <button data-index="${index}">Verwijder</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      ids.splice(index, 1);
      renderIDs();
    });
    idList.appendChild(li);
  });
}

// 🔁 Inlogstatus
onAuthStateChanged(auth, user => {
  if (user) {
    loginForm.style.display = "none";
    mainPanel.style.display = "block";
  } else {
    loginForm.style.display = "block";
    mainPanel.style.display = "none";
    ids = []; // wis lokale data bij logout
    renderIDs();
  }
});
