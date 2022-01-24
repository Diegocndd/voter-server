require('dotenv').config();
const mysql = require('mysql');

// let con = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     timezone: 'utc',
// });

var con  = mysql.createPool({
    connectionLimit : 2,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

// con.on('error', err => {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         console.log('kkk');
//         disconnect_handler();
//         con = mysql.createConnection({
//             host: process.env.HOST,
//             user: process.env.USER,
//             password: process.env.PASSWORD,
//             database: process.env.DATABASE,
//             timezone: 'utc',
//         });
//     } else {
//         throw err;
//     }
// });

module.exports = {
    con,
}