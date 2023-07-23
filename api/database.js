const DATABASE = require("../database/connection");

// Function to insert data into the database
function insertData(data, callback) {
    const { requestor_name, requestor_email, email_name, program_name } = data;
    const sql = `INSERT INTO items (requestor_name, requestor_email, email_name, program_name) VALUES (?, ?, ?, ?)`;
    const values = [requestor_name, requestor_email, email_name, program_name];

    DATABASE.query(sql, values, callback);
}

// Function to fetch a specific record from the database by ID
function fetchRecordById(id, callback) {
    const sql = `SELECT * FROM items WHERE id = ?`;
    DATABASE.query(sql, [id], callback);
}

// Function to fetch all records from the database
function fetchAllRecords(callback) {
    const sql = `SELECT * FROM items`;
    DATABASE.query(sql, callback);
}

// Function to update a record in the database by ID
function updateRecordById(id, newData, callback) {
    const { requestor_name, requestor_email, email_name, program_name, subjectLine, preHeader, email } = newData;
    const sql = `UPDATE items SET requestor_name = ?, requestor_email = ?, email_name = ?, program_name = ?, subjectLine = ?, preHeader = ?, email = ? WHERE id = ?`;
    const values = [requestor_name, requestor_email, email_name, program_name, subjectLine, preHeader, email, id];

    DATABASE.query(sql, values, callback);
}


// Function to delete a record from the database by ID
function deleteRecord(id, callback) {
    var sql = `DELETE FROM items WHERE id = ?`;
    var values = [id];

    DATABASE.query(sql, values, function (err, result) {
        if (err) {
            console.error("Error deleting record:", err);
            return callback(err);
        }
        callback(null, result); // Pass the result to the callback function
    });
}


module.exports = {
    insertData,
    fetchRecordById,
    fetchAllRecords,
    updateRecordById,
    deleteRecord
};
