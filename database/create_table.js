const mysql = require('mysql');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'NodeJS_Starter'
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL DB");

   
   let sqlTable = `CREATE TABLE items ( id int AUTO_INCREMENT, column1 VARCHAR(255), column2 VARCHAR(255)  )`;
    
   connection.query(sqlTable, function (err, result) {
    if (err) {
      console.log("Table might already exist");
      console.log(err)
    }
   else {
    console.log("Table created");
  }
    
    });
  });

console.log("Script Complete")
