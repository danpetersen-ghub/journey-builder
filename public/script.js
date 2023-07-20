//console.log(`We are Live with Starter App..`);

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

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON);

      //Display Status/Login message
      document.getElementById("output").innerText = responseJSON.message;

      if (responseJSON.success === true) {
        //load app
        loadApplication(responseJSON.data);
      }
    });
}

function loadApplication(data) {
  contentArea();
  //displayDataTable(data);
  getAllRecords();
  addToNavUI(formNavItem);
  addToNavUI(dashboardNavItem);
  document
    .getElementsByClassName("dashboard")[0]
    .addEventListener("click", getAllRecords);
  document
    .getElementsByClassName("form")[0]
    .addEventListener("click", showForm);
}

//onLoginSubmit
let loginButton = document.getElementById("submit");
loginButton.addEventListener("click", function () {
  console.log("submit hit");
  sendLoginCreds();
});

//Update UI with DB Saved data
function displayDataTable(records) {
  contentArea();
  let tableRows = "";
  for (var i = 0; i < records.length; i++) {
    tableRows += `  <tr>
                                  <th scope="row"><a href="/item/${records[i].id}">${records[i].id} </a></th>
                                  <td>${records[i].column1}</td>
                                  <td>${records[i].column2}</td>
                              </tr>`;
  }
  let tableHTML = `
	  <table class="table" id="data-table">
		<thead>
		  <tr>
			<th scope="col" class="sortable" data-sort-key="id">#</th>
			<th scope="col" class="sortable" data-sort-key="column1">Column1</th>
			<th scope="col" class="sortable" data-sort-key="column2">Column2</th>
		  </tr>
		</thead>
		<tbody>
		  ${tableRows}
		</tbody>
	  </table>
	`;
  contentArea(tableHTML);
}

//add event listeners to the headers
let headers = document.querySelectorAll('#data-table .sortable');
headers.forEach(header => {
  header.addEventListener('click', function() {
    let sortKey = this.dataset.sortKey;
    sortTable(sortKey);
  });
});

//This function will sort the rows in the table based on the clicked column
function sortTable(sortKey) {
  let table = document.getElementById('data-table');
  let rows = Array.from(table.rows).slice(1);  // Convert to array and skip header row
  let sortedRows;

  // Sort rows based on the content of the specified column
  if (sortKey === 'id') {
    sortedRows = rows.sort((a, b) => a.cells[0].textContent - b.cells[0].textContent);
  } else {
    sortedRows = rows.sort((a, b) => a.cells[sortKey === 'column1' ? 1 : 2].textContent.localeCompare(b.cells[sortKey === 'column1' ? 1 : 2].textContent));
  }

  // Remove existing rows
  rows.forEach(row => table.deleteRow(row.rowIndex));

  // Add sorted rows
  sortedRows.forEach(row => table.tBodies[0].appendChild(row));
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
  let FormHTML = `<div class="margin-top">
                    <label>Column 1</label>
                    <div id="editor1"></div><br /><br />

                    <label>Column 2</label>
                    <div id="editor2"></div><br /><br />

                    <button class="login-btn" id="create" type="button" name="create" /> Create </button>
                  </div>`;
  contentArea(FormHTML);

  var quill1 = new Quill('#editor1', {
    theme: 'snow'
  });

  var quill2 = new Quill('#editor2', {
    theme: 'snow'
  });

  document.getElementById("create").addEventListener("click", function () {
    let column1 = quill1.root.innerHTML;
    let column2 = quill2.root.innerHTML;

    createRecord(column1, column2);
  });
}

function createRecord(value1, value2) {
  let payload = {
    column1: value1,
    column2: value2,
  };

  //send data to api endpoint
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), //{"column1":"abc","column2":"xyz"}
  };

  //send data to api endpoint to login
  const response = fetch("/api/data", headers);
  console.log("Sent Req to: /api/data");

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON);
      getAllRecords(); // Call getAllRecords() after the new record has been created
    });
}

function getAllRecords() {
  //send data to api endpoint
  const headers = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  //send data to api endpoint to get data
  const response = fetch("/api/all/data", headers);
  console.log("Sent Req to: /api/all/data");

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      displayDataTable(responseJSON);
    });
}
