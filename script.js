document.addEventListener("DOMContentLoaded", () => {
    const loginPanel = document.getElementById("login-panel");
    const mainPanel = document.getElementById("main-panel");
  
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
  
    const validUser = "admin";
    const validPass = "wachtwoord123";
  
    // Check of user al is ingelogd
    if (localStorage.getItem("isLoggedIn") === "true") {
      showMainPanel();
    }
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === validUser && password === validPass) {
        localStorage.setItem("isLoggedIn", "true");
        showMainPanel();
      } else {
        loginError.textContent = "Ongeldige gebruikersnaam of wachtwoord.";
      }
    });
  
    function showMainPanel() {
      loginPanel.style.display = "none";
      mainPanel.style.display = "block";
      initListApp();
  
      // UITLOG-KNOP ACTIE
      document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        location.reload();
      });
    }
  
    // ======= Lijst functionaliteit ======= //
    function initListApp() {
      const list = document.getElementById("items-list");
      const form = document.getElementById("add-form");
  
      let items = JSON.parse(localStorage.getItem("items")) || [];
      items.forEach(item => addItemToDOM(item));
  
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const naam = document.getElementById("naam").value;
        const beschrijving = document.getElementById("beschrijving").value;
        const status = document.getElementById("status").value;
  
        const newItem = { naam, beschrijving, status };
        items.push(newItem);
        saveItems();
  
        addItemToDOM(newItem);
        form.reset();
      });
  
      function addItemToDOM(itemData) {
        const item = document.createElement("li");
        item.classList.add("item");
  
        item.innerHTML = `
          <div class="string">Naam: ${itemData.naam}</div>
          <div class="string">Beschrijving: ${itemData.beschrijving}</div>
          <div class="string">Status: ${itemData.status}</div>
          <button class="remove-btn">Verwijderen</button>
        `;
  
        item.querySelector(".remove-btn").addEventListener("click", () => {
          list.removeChild(item);
          items = items.filter(i =>
            !(i.naam === itemData.naam &&
              i.beschrijving === itemData.beschrijving &&
              i.status === itemData.status)
          );
          saveItems();
        });
  
        list.appendChild(item);
      }
  
      function saveItems() {
        localStorage.setItem("items", JSON.stringify(items));
      }
    }
  });
  