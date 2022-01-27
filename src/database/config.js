require('dotenv').config();
const mysql = require('mysql');

var con  = mysql.createPool({
    connectionLimit : 2,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

module.exports = {
    con,
}