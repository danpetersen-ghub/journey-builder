console.log(`We are Live with Starter App..`);

const DATA = [];

// Make an HTTP request to the /json/ route of our express server:
// fetch("/json")
//   // Get the request body and convert to JSON:
//   .then((res) => res.json())
//   // Here we have the request body as a JSON object ready to be used:
//   .then((templateData) => {
//     console.log(templateData);
//     // document.getElementById(
//     //   "data"
//     // ).innerHTML = `<label>Firstname: </label><span>${templateData.firstname}</span><br
//     // <label>Lastname: </label><span>${templateData.lastname} </span>`;
//   })
//   .catch(console.error);

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
      console.log(responseJSON);
      document.getElementById("output").innerText = responseJSON.message;
      if (responseJSON.success === true) {
        contentArea();
        displayDataTable(responseJSON.data);
        addToNavUI(formNavItem);
      }
    });
}

//onLoginSubmit
let loginButton = document.getElementById("submit");
loginButton.addEventListener("click", function () {
  console.log("submit hit");
  sendLoginCreds(DATA);
});

//Update UI with DB Saved data
function displayDataTable(records) {
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
  nav.appendChild(apps);
}

let formNavItem = `
                  <div class="navitem">
                  <a href="#">
                    <i class="far fa-question-circle form"></i>          
                  </a>
                  `;

function Form() {}
