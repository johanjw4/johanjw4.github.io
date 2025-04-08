const loginDiv = document.getElementById("login");
const panelDiv = document.getElementById("panel");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const stringList = document.getElementById("stringList");
const newStringInput = document.getElementById("newString");
const addStringBtn = document.getElementById("addStringBtn");

let currentUser = null;

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loginDiv.style.display = "none";
    panelDiv.style.display = "block";
    loadStrings();
  } else {
    currentUser = null;
    loginDiv.style.display = "block";
    panelDiv.style.display = "none";
  }
});

loginBtn.addEventListener("click", () => {
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
});

logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

addStringBtn.addEventListener("click", async () => {
  const str = newStringInput.value.trim();
  if (!str) return;

  const userRef = db.collection("users").doc(currentUser.uid);
  const doc = await userRef.get();
  const data = doc.exists ? doc.data() : { strings: [] };

  data.strings.push(str);
  await userRef.set(data);
  newStringInput.value = "";
  renderList(data.strings);
});

async function loadStrings() {
  const userRef = db.collection("users").doc(currentUser.uid);
  const doc = await userRef.get();
  const data = doc.exists ? doc.data() : { strings: [] };
  renderList(data.strings);
}

function renderList(strings) {
  stringList.innerHTML = "";
  strings.forEach((str, index) => {
    const li = document.createElement("li");
    li.textContent = str;
    li.style.cursor = "pointer";
    li.addEventListener("click", async () => {
      strings.splice(index, 1);
      await db.collection("users").doc(currentUser.uid).set({ strings });
      renderList(strings);
    });
    stringList.appendChild(li);
  });
}
