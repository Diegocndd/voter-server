const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "vote",
});

module.exports = {
    con,
}