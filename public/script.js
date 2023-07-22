import { sendLoginCreds, getAllRecords } from './modules/api.mjs';
import { contentArea, addToNavUI, showRequestForm } from './modules/ui.mjs';
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

const loginButton = document.getElementById("login");
console.log(loginButton);

loginButton.addEventListener("click", function () {
  console.log("Login Form Attempted");
  sendLoginCreds();
});
