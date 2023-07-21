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
    .addEventListener("click", showRequestForm);
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
					  <td>${records[i].requestor_name}</td>
					  <td>${records[i].requestor_email}</td>
					  <td>${records[i].email_name}</td>
					  <td>${records[i].program_name}</td>
					  <td>
						<span class="delete-icon" data-id="${records[i].id}" style="color: red;">Delete</span>
						<span class="delete-confirm" data-id="${records[i].id}" style="display: none;">
						  Are you sure you want to delete this record, this cannot be undone!
						  <br>
						  <span class="confirm-delete" data-id="${records[i].id}" style="color: red;">Confirm</span>
						  <span class="cancel-delete" data-id="${records[i].id}" style="color: darkgrey;">Cancel</span>
						</span>
					  </td>
				  </tr>`;
	}

  let tableHTML = `
                    <table class="table" id="data-table">
                    <thead>
                      <tr>
                        <th scope="col" class="sortable" data-sort-key="id">#</th>
                        <th scope="col" class="sortable" data-sort-key="requestor_name">Requestor Name</th>
                        <th scope="col" class="sortable" data-sort-key="requestor_email">Requestor Email</th>
                        <th scope="col" class="sortable" data-sort-key="email_name">Email Name</th>
                        <th scope="col" class="sortable" data-sort-key="program_name">Program Name</th>
                        <th scope="col">Actions</th>
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
  
  //shows and hides the delete text and warning
  document.querySelectorAll('.delete-icon').forEach(item => {
    item.addEventListener('click', event => {
      let id = event.target.dataset.id;
      event.target.style.display = 'none'; // Hide the "Delete" text
      document.querySelector(`.delete-confirm[data-id="${id}"]`).style.display = 'block'; // Show the warning message
    });
  });

  document.querySelectorAll('.cancel-delete').forEach(item => {
    item.addEventListener('click', event => {
      let id = event.target.dataset.id;
      document.querySelector(`.delete-confirm[data-id="${id}"]`).style.display = 'none'; // Hide the warning message
      document.querySelector(`.delete-icon[data-id="${id}"]`).style.display = 'inline'; // Show the "Delete" text
    });
  });
  
  // Add event listeners to trashcan icons
  let deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      let id = this.dataset.id;
      document.querySelector(`.delete-confirm[data-id="${id}"]`).style.display = 'inline';
    });
  });

  // Add event listeners to checkmark icons
  let confirmDeletes = document.querySelectorAll('.confirm-delete');
  confirmDeletes.forEach(icon => {
    icon.addEventListener('click', function() {
      let id = this.dataset.id;
      deleteRecord(id);
    });
  });

  // Add event listeners to cross icons
  let cancelDeletes = document.querySelectorAll('.cancel-delete');
  cancelDeletes.forEach(icon => {
    icon.addEventListener('click', function() {
      let id = this.dataset.id;
      document.querySelector(`.delete-confirm[data-id="${id}"]`).style.display = 'none';
    });
  });
}

function deleteRecord(id) {
  //send data to api endpoint
  const headers = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  //send data to api endpoint to delete record
  const response = fetch(`/api/data/${id}`, headers);
  console.log(`Sent Req to: /api/data/${id}`);

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON);
      getAllRecords(); // Call getAllRecords() after the record has been deleted
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

function showRequestForm() {
  contentArea();
  let FormHTML = `
    <div class="container">
      <h2>Request Information</h2>
      <form>
        <div class="mb-3">
          <label for="requestor_name" class="form-label">Requestor Name</label>
          <input type="text" class="form-control" id="requestor_name" name="requestor_name">
        </div>
        <div class="mb-3">
          <label for="requestor_email" class="form-label">Requestor Email</label>
          <input type="email" class="form-control" id="requestor_email" name="requestor_email">
        </div>
        <div class="mb-3">
          <label for="email_name" class="form-label">Email Name</label>
          <input type="text" class="form-control" id="email_name" name="email_name">
        </div>
        <div class="mb-3">
          <label for="program_name" class="form-label">Program Name</label>
          <input type="text" class="form-control" id="program_name" name="program_name">
        </div>
        <button class="btn btn-primary" id="create" type="button" name="create">Create</button>
      </form>
    </div>
  `;
  contentArea(FormHTML);

  document.getElementById("create").addEventListener("click", function () {
    let requestor_name = document.getElementById("requestor_name").value;
    let requestor_email = document.getElementById("requestor_email").value;
    let email_name = document.getElementById("email_name").value;
    let program_name = document.getElementById("program_name").value;

    createRecord(requestor_name, requestor_email, email_name, program_name);
    showEmailBriefForm(requestor_name, requestor_email, email_name, program_name);
  });
}

function showEmailBriefForm(requestor_name, requestor_email, email_name, program_name) {
  contentArea();
  let FormHTML = `
    <div class="container">
      <h2>Request Information</h2>
      <form>
        <div class="mb-3">
          <label for="requestor_name" class="form-label">Requestor Name</label>
          <input type="text" class="form-control" id="requestor_name" name="requestor_name" value="${requestor_name}" readonly>
        </div>
        <div class="mb-3">
          <label for="requestor_email" class="form-label">Requestor Email</label>
          <input type="email" class="form-control" id="requestor_email" name="requestor_email" value="${requestor_email}" readonly>
        </div>
        <div class="mb-3">
          <label for="email_name" class="form-label">Email Name</label>
          <input type="text" class="form-control" id="email_name" name="email_name" value="${email_name}">
        </div>
        <div class="mb-3">
          <label for="program_name" class="form-label">Program Name</label>
          <input type="text" class="form-control" id="program_name" name="program_name" value="${program_name}">
        </div>
      </form>

      <h2>Email Brief</h2>
      <form>
        <div class="mb-3">
          <label class="form-label">Subject Line</label>
          <div id="editorSubjectLine"></div>
        </div>
        <div class="mb-3">
          <label class="form-label">Pre-header</label>
          <div id="editorPreHeader"></div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div id="email"></div>
        </div>
        <button class="btn btn-primary" id="cancel" type="button" name="cancel">Cancel</button>
        <button class="btn btn-primary" id="save" type="button" name="save">Save</button>
      </form>
    </div>
  `;
  contentArea(FormHTML);

  var quillSubjectLine = new Quill('#editorSubjectLine', {
    theme: 'snow'
  });

  var quillPreHeader = new Quill('#editorPreHeader', {
    theme: 'snow'
  });

  fetch('/src/20230720modularTemplate.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Specify the order of the modules
      const moduleOrder = ['TopBorder', 'header-2', 'bannermodulev2', 'headingmodule', 'subheadingmodule', 'freetextmodule', 'ctamodule1', 'textwithimage5', 'footermodulv1', 'footermodulv2'];

      // Extract the modules in the specified order
      const emailHTML = moduleOrder.map(id => doc.getElementById(id).outerHTML).join('');

      // Display the email HTML in the "Email" field
      document.getElementById('email').innerHTML = emailHTML;
    });

  document.getElementById("cancel").addEventListener("click", function () {
    location.reload();
  });

  document.getElementById("save").addEventListener("click", function () {
    let email_name = document.getElementById("email_name").value;
    let program_name = document.getElementById("program_name").value;
    let subjectLine = quillSubjectLine.root.innerHTML;
    let preHeader = quillPreHeader.root.innerHTML;
    let email = document.getElementById("email").innerHTML;

    createRecord(requestor_name, requestor_email, email_name, program_name, subjectLine, preHeader, email);
  });
}


function createRecord(requestor_name, requestor_email, email_name, program_name) {
  let payload = {
    requestor_name: requestor_name,
    requestor_email: requestor_email,
    email_name: email_name,
    program_name: program_name,
  };

  //send data to api endpoint
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  //send data to api endpoint to login
  const response = fetch("/api/data", headers);
  console.log("Sent Req to: /api/data");

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON); // This will log the responseJSON to the console
      // Display the newly created record instead of all records
      showEmailBriefForm(responseJSON.data); 
    });
}

function showEmailBriefForm(record) {
  contentArea();
  let FormHTML = `
    <div class="container">
      <h2>Request Information</h2>
      <form>
        <div class="mb-3">
          <label for="requestorName" class="form-label">Requestor Name</label>
          <input type="text" class="form-control" id="requestorName" name="requestorName" value="${record.requestor_name}" readonly>
        </div>
        <div class="mb-3">
          <label for="requestorEmail" class="form-label">Requestor Email</label>
          <input type="email" class="form-control" id="requestorEmail" name="requestorEmail" value="${record.requestor_email}" readonly>
        </div>
        <div class="mb-3">
          <label for="emailName" class="form-label">Email Name</label>
          <input type="text" class="form-control" id="emailName" name="emailName" value="${record.email_name}">
        </div>
        <div class="mb-3">
          <label for="programName" class="form-label">Program Name</label>
          <input type="text" class="form-control" id="programName" name="programName" value="${record.program_name}">
        </div>
      </form>
        <button class="btn btn-primary" id="cancel" type="button" name="cancel">Cancel</button>
        <button class="btn btn-primary" id="save" type="button" name="save">Save</button>
      <h2>Email Brief</h2>
      <form>
        <div class="mb-3">
          <label class="form-label">Subject Line</label>
          <div id="editorSubjectLine"></div>
        </div>
        <div class="mb-3">
          <label class="form-label">Pre-header</label>
          <div id="editorPreHeader"></div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div id="email"></div>
        </div>
      </form>
    </div>
  `;
  contentArea(FormHTML);

  var quillSubjectLine = new Quill('#editorSubjectLine', {
    theme: 'snow'
  });

  var quillPreHeader = new Quill('#editorPreHeader', {
    theme: 'snow'
  });

  fetch('/src/20230720modularTemplate.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Specify the order of the modules
      const moduleOrder = ['TopBorder', 'header-2', 'bannermodulev2', 'headingmodule', 'subheadingmodule', 'freetextmodule', 'ctamodule1', 'textwithimage5', 'footermodulv1', 'footermodulv2'];

      // Extract the modules in the specified order
      const emailHTML = moduleOrder.map(id => doc.getElementById(id).outerHTML).join('');

      // Display the email HTML in the "Email" field
      document.getElementById('email').innerHTML = emailHTML;
    });

	document.getElementById("cancel").addEventListener("click", function () {
	  displayRecord(record);
	});

  document.getElementById("save").addEventListener("click", function () {
    let emailName = document.getElementById("emailName").value;
    let programName = document.getElementById("programName").value;
    let subjectLine = quillSubjectLine.root.innerHTML;
    let preHeader = quillPreHeader.root.innerHTML;
    let email = document.getElementById("email").innerHTML;

    updateRecord(record.id, record.requestor_name, record.requestor_email, emailName, programName, subjectLine, preHeader, email);
  });
}

function displayRecord(record) {
  document.getElementById("emailName").value = record.email_name;
  document.getElementById("programName").value = record.program_name;
}

function updateRecord(requestor_name, requestor_email, email_name, program_name, subjectLine, preHeader, email) {
  let payload = {
    requestor_name: requestor_name,
    requestor_email: requestor_email,
    email_name: email_name,
    program_name: program_name,
    subjectLine: subjectLine,
    preHeader: preHeader,
    email: email
  };

  //send data to api endpoint
  const headers = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  //send data to api endpoint to update record
  const response = fetch("/api/data", headers);
  console.log("Sent Req to: /api/data");

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON);
      getAllRecords(); // Call getAllRecords() after the record has been updated
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

