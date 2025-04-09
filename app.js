const auth = firebase.auth();
const db = firebase.firestore();

// Inloggen
function login(email, password) {
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    console.error("Error logging in: ", error.message);
  });
}

// Uitloggen
function logout() {
  auth.signOut();
}

// ID toevoegen
function addId(idnr, naam, wachtwoord) {
  const user = auth.currentUser;
  if (user) {
    db.collection("ids").add({
      idnr: idnr,
      naam: naam,
      wachtwoord: wachtwoord,
      userId: user.uid
    }).then(() => {
      console.log("ID toegevoegd");
    }).catch((error) => {
      console.error("Error adding ID: ", error.message);
    });
  }
}

// ID verwijderen
function deleteId(id) {
  db.collection("ids").doc(id).delete().then(() => {
    console.log("ID verwijderd");
  }).catch((error) => {
    console.error("Error deleting ID: ", error.message);
  });
}

// Get IDs voor weergave
function getIds() {
  db.collection("ids").get().then((snapshot) => {
    snapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });
  }).catch((error) => {
    console.error("Error getting IDs: ", error.message);
  });
}

// Luister naar loginstatus
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Ingelogd als:", user.email);
  } else {
    console.log("Niet ingelogd");
  }
});
