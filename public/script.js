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
  addToNavUI(showModulesNavItem);
  document
    .getElementsByClassName("dashboard")[0]
    .addEventListener("click", getAllRecords);
  document
    .getElementsByClassName("form")[0]
    .addEventListener("click", showForm);
  document
    .getElementsByClassName("show-modules")[0]
    .addEventListener("click", showModules);
}

//onLoginSubmit
let loginButton = document.getElementById("submit");
loginButton.addEventListener("click", function () {
  console.log("submit hit");
  sendLoginCreds();
});

//keeping track of sorting order
let sortOrders = {
  id: 'desc',
  column1: 'asc',
  column2: 'asc',
};

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

  //add event listeners to the headers
  let headers = document.querySelectorAll('#data-table .sortable');
  headers.forEach(header => {
    header.addEventListener('click', function() {
      let sortKey = this.dataset.sortKey;
      let sortOrder = this.dataset.sortOrder;
      sortTable(sortKey, sortOrder);
      // switch the sort order for the next click
      this.dataset.sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    });
  });
}

//This function will sort the rows in the table based on the clicked column
function sortTable(sortKey, sortOrder) {
  // Toggle sort order
  sortOrders[sortKey] = sortOrders[sortKey] === 'desc' ? 'asc' : 'desc';
  sortOrder = sortOrders[sortKey];

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
      let records = responseJSON;
      records.sort((a, b) => {
        if (sortOrder === 'desc') {
          if (a[sortKey] < b[sortKey]) return -1;
          if (a[sortKey] > b[sortKey]) return 1;
          return 0;
        } else {
          if (a[sortKey] < b[sortKey]) return 1;
          if (a[sortKey] > b[sortKey]) return -1;
          return 0;
        }
      });
      displayDataTable(records);
    });
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
let showModulesNavItem = `
                  <div class="navitem">
                  <a href="#">
                  <i class="fa-solid fa-cubes show-modules"></i>    
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

// bit of code to load the modules from public/src/20230720modularTemplate.html and to add a new navicon that when clicked shows all the modules
function showModules() {
  fetch('/src/20230720modularTemplate.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Find all the tr elements with the class mktoModule and extract their IDs
      const modules = Array.from(doc.querySelectorAll('tr.mktoModule'));

      // When the navItem is clicked, update the page to display all the modules
      const contentArea = document.querySelector('.content-container');
      contentArea.innerHTML = modules.map(module => `<h2>${module.id}</h2>` + module.outerHTML + '<hr>').join('');
    });
}

