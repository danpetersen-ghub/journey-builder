/* 
bit of code to load the modules from 
public/src/20230720modularTemplate.html and to 
add a new navicon that when clicked shows all the modules
*/
export function showModules() {
    fetch('/modules/20230720modularTemplate.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Find all the tr elements with the class mktoModule and extract their IDs
            const modules = Array.from(doc.querySelectorAll('tr.mktoModule'));

            // When the navItem is clicked, update the page to display all the modules
            const contentArea = document.querySelector('.content-container');
            contentArea.innerHTML = modules.map(module => `<h2>${module.id}</h2>` + `<span style="max-width:650px"> ${module.outerHTML} </span>` + '<hr>').join('');
        });
}