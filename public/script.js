console.log(`We are Live with Starter App..`);

const DATA = [];

function sendLoginCreds() {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let payload = {
    username: username,
    password: password,
  };

  //send data to api endpoint
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), //{"username":"johndoe","password":"pass"}
  };

  //send data to api endpoint to login
  const response = fetch("/api/login", headers);

  //log out the response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON); //{"Data":{}}, "success": true, "message":"loremIpsum" }
      document.getElementById("output").innerText = responseJSON.message;
      if (responseJSON.success === true) {
        loadApplication(responseJSON.data);
        contentArea();
        displayDataTable(responseJSON.data);
        addToNavUI(formNavItem);
        addToNavUI(dashboardNavItem);
      }
    });
}

function loadApplication(data) {
  displayDataTable(data);
  addToNavUI(formNavItem);
  addToNavUI(dashboardNavItem);
  document
    .getElementsByClassName("dashboard")[0]
    .addEventListener("click", displayDataTable);
  document
    .getElementsByClassName("form")[0]
    .addEventListener("click", showForm);
}

//onLoginSubmit
let loginButton = document.getElementById("submit");
loginButton.addEventListener("click", function () {
  console.log("submit hit");
  sendLoginCreds(DATA);
});

//Update UI with DB Saved data
function displayDataTable(records) {
  contentArea();
  let tableRows = "";
  for (var i = 0; i < records.length; i++) {
    records[i].tableRows += `  <tr>
                      <th scope="row">${i}</th>
                      <td>${records[i].property1}</td>
                      <td>${records[i].property2}</td>
                  </tr>`;
  }
  let tableHTML = `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Column1</th>
      <th scope="col">Column2</th>
    </tr>
  </thead>
  <tbody>
  ${tableRows}
  </tbody>
  </table>
  `;
  contentArea(tableHTML);
}

//clearContentArea
function contentArea(content) {
  let contentArea = document.getElementsByClassName("content-container")[0];
  contentArea.innerHTML = content;
}

//update Nav
function addToNavUI(apps) {
  let nav = document.getElementsByClassName("navbox")[0];
  nav.innerHTML += apps;
}

let formNavItem = `
                  <div class="navitem">
                  <a href="#">
                  <i class="fa-solid fa-square-plus form"></i>      
                  </a>
                  `;
let dashboardNavItem = `
  <div class="navitem">
  <a href="#">
  <i class="fa-solid fa-table dashboard"></i>    
  </a>
  `;

function showForm() {
  contentArea();
  let FormHTML = `                <label for="col1">Username</label>
  <input type="text" id="username" name="Username" /><br /><br />

  <label for="password">Password</label>
  <input type="text" id="password" name="password" /><br /><br />

  <button class="login-btn" id="submit" type="button" name="Login" /> Login </button>`;
  contentArea(FormHTML);
}
