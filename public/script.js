import { sendLoginCreds, getAllRecords, createRecord, deleteRecord, updateRecord } from './modules/api.mjs';
import { displayDataTable, contentArea, addToNavUI, showRequestForm, showEmailBriefForm, displayRecord } from './modules/ui.mjs';
import { initializeQuillEditor } from './modules/quill.mjs';
import { showModules } from './modules/emailTemplates.mjs';
import { formNavItem, dashboardNavItem, showModulesNavItem } from './modules/nav.mjs'

console.log(`We are Live with Starter App..`);

export function loadApplication(data) {
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