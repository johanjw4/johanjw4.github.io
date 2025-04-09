let user = null;

auth.onAuthStateChanged((u) => {
  document.getElementById("loading").style.display = "none";

  if (u) {
    user = u;
    document.getElementById("login-form").style.display = "none";
    document.getElementById("app").style.display = "block";
    load();
  } else {
    user = null;
    document.getElementById("login-form").style.display = "block";
    document.getElementById("app").style.display = "none";
  }
});

function login() {
  const email = document.getElementById("email").value;
  const pw = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pw).catch((err) =>
    alert("Login fout: " + err.message)
  );
}

function logout() {
  auth.signOut();
}

async function toevoegen() {
  const naam = document.getElementById("naam").value;
  const idnr = document.getElementById("idnr").value;
  const idpass = document.getElementById("idpass").value;

  if (!naam || !idnr || !idpass) {
    alert("Alles invullen!");
    return;
  }

  const item = { naam, idnr, idpass };
  const ref = db.collection("users").doc(user.uid);
  const doc = await ref.get();
  const data = doc.exists ? doc.data() : { items: [] };
  data.items.push(item);
  await ref.set(data);
  load();
}

async function load() {
  const ref = db.collection("users").doc(user.uid);
  const doc = await ref.get();
  const items = doc.exists ? doc.data().items : [];
  const list = document.getElementById("items");
  list.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${item.naam}</b><br>ID: ${item.idnr}<br>Wachtwoord: ${item.idpass}`;
    li.onclick = async () => {
      items.splice(index, 1);
      await ref.set({ items });
      load();
    };
    list.appendChild(li);
  });
}
