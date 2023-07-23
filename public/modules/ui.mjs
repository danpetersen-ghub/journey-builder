import { createRecord, deleteRecord, updateRecord } from './api.mjs';
import { sortOrders, sortTable } from './sortTable.mjs';

export function displayDataTable(records) {
  // ... code for displaying data tables ...
  contentArea();
  let tableRows = "";
  for (var i = 0; i < records.length; i++) {
    tableRows += `<tr>
                            <th scope="row"><a href="/item/${records[i].id}">${records[i].id} </a></th>
                            <td>${records[i].requestor_name} </td>
                            <td>${records[i].requestor_email}  </td>
                            <td>${records[i].email_name} </td>
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
                              <th scope="col" class="sortable" data-sort-key="id"># <i class="fa-solid fa-chevron-up fa-rotate-90"></i> </th>
                              <th scope="col" class="sortable" data-sort-key="requestor_name">Requestor Name <i class="fa-solid fa-chevron-up fa-rotate-90"></i> </th>
                              <th scope="col" class="sortable" data-sort-key="requestor_email">Requestor Email <i class="fa-solid fa-chevron-up fa-rotate-90"></i> </th>
                              <th scope="col" class="sortable" data-sort-key="email_name">Email Name <i class="fa-solid fa-chevron-up fa-rotate-90"></i> </th>
                              <th scope="col" class="sortable" data-sort-key="program_name">Program Name <i class="fa-solid fa-chevron-up fa-rotate-90"></i> </th>
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
    header.addEventListener('click', function () {
      let sortKey = this.dataset.sortKey;
      let sortOrder = this.dataset.sortOrder;
      sortTable(sortKey, sortOrder);

      // Get the chevron icon element inside the header
      const icon = this.querySelector('.chevron-icon');

      // Toggle the 'rotated' class on the chevron icon element
      icon.classList.toggle('rotated', sortOrder === 'desc');

      // Switch the sort order for the next click
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
    icon.addEventListener('click', function () {
      let id = this.dataset.id;
      document.querySelector(`.delete-confirm[data-id="${id}"]`).style.display = 'inline';
    });
  });

  // Add event listeners to checkmark icons
  let confirmDeletes = document.querySelectorAll('.confirm-delete');
  confirmDeletes.forEach(icon => {
    icon.addEventListener('click', function () {
      let id = this.dataset.id;
      deleteRecord(id);
    });
  });

  // Add event listeners to cross icons
  let cancelDeletes = document.querySelectorAll('.cancel-delete');
  cancelDeletes.forEach(icon => {
    icon.addEventListener('click', function () {
      let id = this.dataset.id;
      document.querySelector(`.delete-confirm[data-id="${id}"]`).style.display = 'none';
    });
  });

}

export function contentArea(content) {
  // ... code for updating the content area ...
  let contentArea = document.getElementsByClassName("content-container")[0];
  contentArea.innerHTML = content;
}

export function addToNavUI(apps) {
  // ... code for adding items to the navigation bar ...
  let nav = document.getElementsByClassName("navbox")[0];
  nav.innerHTML += apps;
}

export function showRequestForm() {
  // ... code for showing the request form ...
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

  // document.getElementById("create").addEventListener("click", function () {
  //   let requestor_name = document.getElementById("requestor_name").value;
  //   let requestor_email = document.getElementById("requestor_email").value;
  //   let email_name = document.getElementById("email_name").value;
  //   let program_name = document.getElementById("program_name").value;

  //   createRecord(requestor_name, requestor_email, email_name, program_name).then((data) =>
  //     showEmailBriefForm(data.id, data.requestor_name, data.requestor_email, data.email_name, data.program_name)
  //   );


  //   //showEmailBriefForm(newRecord.id, newRecord.requestor_name, newRecord.requestor_email, newRecord.email_name, newRecord.program_name);
  // });

  document.getElementById("create").addEventListener("click", async function () {
    let requestor_name = document.getElementById("requestor_name").value;
    let requestor_email = document.getElementById("requestor_email").value;
    let email_name = document.getElementById("email_name").value;
    let program_name = document.getElementById("program_name").value;

    const data = await createRecord(requestor_name, requestor_email, email_name, program_name)

    console.log("id is: ", data.data.id)

    await showEmailBriefForm(data.data.id, data.data.requestor_name, data.data.requestor_email, data.data.email_name, data.data.program_name);

  });

}

export function showEmailBriefForm(id, requestor_name, requestor_email, email_name, program_name) {
  // ... code for showing the email brief form ...
  // contentArea();
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
            <span id="email-id" data-value="${id}">Email id:${id}</span>
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

  fetch('/modules/20230720modularTemplate.html')
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
    let id = document.getElementById("email-id").dataset
    let email_name = document.getElementById("email_name").value;
    let program_name = document.getElementById("program_name").value;
    let subjectLine = quillSubjectLine.root.innerHTML;
    let preHeader = quillPreHeader.root.innerHTML;
    let email = document.getElementById("email").innerHTML;

    updateRecord(id, requestor_name, requestor_email, email_name, program_name, subjectLine, preHeader, email);
  });

}

export function displayRecord(record) {
  // ... code for displaying a record ...
  document.getElementById("emailName").value = record.email_name;
  document.getElementById("programName").value = record.program_name;
}
