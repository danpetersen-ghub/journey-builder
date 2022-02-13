console.log(`We are Live with Starter App..`);

const DATA = [];

// Make an HTTP request to the /json/ route of our express server:
fetch("/json")
  // Get the request body and convert to JSON:
  .then((res) => res.json())
  // Here we have the request body as a JSON object ready to be used:
  .then((templateData) => {
    console.log(templateData);
    // document.getElementById(
    //   "data"
    // ).innerHTML = `<label>Firstname: </label><span>${templateData.firstname}</span><br
    // <label>Lastname: </label><span>${templateData.lastname} </span>`;
  })
  .catch(console.error);

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
    .then((data) => {
      console.log(data);
      document.getElementById("output").innerText = data.message;
    });
}

//onLoginSubmit
let loginButton = document.getElementById("submit");
loginButton.addEventListener("click", function () {
  console.log("submit hit");
  sendLoginCreds(DATA);
});
