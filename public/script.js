console.log(`We are Live with Starter App..`);

const DATA = [];

// Make an HTTP request to the /json/ route of our express server:
fetch("/json")
  // Get the request body and convert to JSON:
  .then((res) => res.json())
  // Here we have the request body as a JSON object ready to be used:
  .then((templateData) => {
    console.log(templateData);
    document.getElementById(
      "data"
    ).innerHTML = `<label>Firstname: </label><span>${templateData.firstname}</span><br
    <label>Lastname: </label><span>${templateData.lastname} </span>`;
  })
  .catch(console.error);

function sendForm() {
  event.preventDefault();

  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;

  let payload = {
    firstName: firstname,
    lastName: lastname,
  };

  //send data to api endpoint
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), //{"firstName":"John","lastName":"Doe"}
  };

  //send data to api endpoint
  const response = fetch("/api/create/record/v1", headers);
  //log out the response
  response
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

//onformsubmit
let submit = document.getElementById("submit");
submit.addEventListener("click", function () {
  console.log("submit hit");
  sendForm(DATA);
});
