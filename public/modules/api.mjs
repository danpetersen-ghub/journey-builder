import { loadApplication } from '../script.js';
import { displayDataTable } from './ui.mjs';
import { showEmailBriefForm } from './ui.mjs';

// src/api.js
export async function sendLoginCreds() {
    event.preventDefault();

    const payload = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    const headers = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch("/auth/login", headers);
        const { success, message, data } = await response.json();
        document.getElementById("output").innerText = message;

        if (message === "Login successful") {
            loadApplication(data);
        }
    } catch (error) {
        console.error("Error sending login credentials:", error);
    }
}


export async function getAllRecords() {
    const headers = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch("/api/data", headers);
        const responseJSON = await response.json();
        displayDataTable(responseJSON.data);
    } catch (error) {
        console.error("Error fetching all records:", error);
    }
}

export function createRecord(requestor_name, requestor_email, email_name, program_name) {
    // ... code for creating a new record ...

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

export function deleteRecord(id) {
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

export function updateRecord(requestor_name, requestor_email, email_name, program_name, subjectLine, preHeader, email) {
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
