//requiert et instancie le driver
var mysql = require('mysql');

var connection = mysql.createPool({
    user: 'node',
    password: 'node',
    database: 'todolist',
    host: 'localhost'
});



module.exports = connection;