const loginDiv = document.getElementById("login");
const panelDiv = document.getElementById("panel");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const naamInput = document.getElementById("naamInput");
const idnrInput = document.getElementById("idnrInput");
const idpassInput = document.getElementById("idpassInput");
const addItemBtn = document.getElementById("addItemBtn");
const itemList = document.getElementById("itemList");

let currentUser = null;

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loginDiv.style.display = "none";
    panelDiv.style.display = "block";
    loadItems();
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

addItemBtn.addEventListener("click", async () => {
  const item = {
    naam: naamInput.value.trim(),
    idnr: idnrInput.value.trim(),
    idpass: idpassInput.value.trim()
  };

  if (!item.naam || !item.idnr || !item.idpass) return;

  const userRef = db.collection("users").doc(currentUser.uid);
  const doc = await userRef.get();
  const data = doc.exists ? doc.data() : { items: [] };

  data.items.push(item);
  await userRef.set(data);

  naamInput.value = "";
  idnrInput.value = "";
  idpassInput.value = "";

  renderItems(data.items);
});

async function loadItems() {
  const userRef = db.collection("users").doc(currentUser.uid);
  const doc = await userRef.get();
  const data = doc.exists ? doc.data() : { items: [] };
  renderItems(data.items);
}

function renderItems(items) {
  itemList.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.naam}</strong><br>
      ID nr: ${item.idnr}<br>
      Wachtwoord: ${item.idpass}
    `;
    li.addEventListener("click", async () => {
      items.splice(index, 1);
      await db.collection("users").doc(currentUser.uid).set({ items });
      renderItems(items);
    });
    itemList.appendChild(li);
  });
}
