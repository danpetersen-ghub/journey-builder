const mysql = require('mysql');

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'JpTWdGEGbhE_Ju9+E'
});

var _prompt = require('prompt');


// disable prefix message & colors
_prompt.message = '';
_prompt.delimiter = '';
_prompt.colors = false;

// wait for user confirmation
_prompt.get({
    properties: {
        
        // setup the dialog
        confirm: {
            // allow yes, no, y, n, YES, NO, Y, N as answer
            pattern: /^(yes|no|y|n)$/gi,
            description: 'Do you really want to delete the Database (Y) or (N) ?',
            message: 'Type yes/no',
            required: true,
            default: 'no'
        }
    }
}, function (err, result){
    // transform to lower case
    var c = result.confirm.toLowerCase();

    // yes or y typed ? otherwise abort
    if (c!='y' && c!='yes'){
        console.log('ABORT');
        return;
    }
    
    
    //console.log('Action confirmed');
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected to MySQL DB");

       connection.query("DROP DATABASE Nodejs_Starter", function (err, result) {
            if (err) {
              console.log("Database might already exist");
              console.log(err)
            }
           else {
            console.log("Database Deleted");
          }
            
          });

    });

    console.log("Script Complete");
    
});


// user confirmation required!
_prompt.start();




