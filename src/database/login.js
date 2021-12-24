const {con} = require('./config');

const generateToken = require('../utils/generateToken');

const loginUser = (login, password, callback) => {
    const sqlByUsername = `SELECT password, id_user FROM user WHERE username='${login}';`;
    const sqlByEmail = `SELECT password, id_user FROM user WHERE email='${login}';`;

    con.query(sqlByUsername, (err, result) => {
        if (err) throw err;
        if (result[0]?.password === password) {
            let id = result[0]?.id_user;
            callback(null, id);
        } else {
            con.query(sqlByEmail, (errEmail, result) => {
                if (result[0]?.password === password) {
                    let id = result[0]?.id_user;
                    callback(null, id);
                } else {
                    callback(errEmail, null);
                }
            })
        }
    });
}

const logoutUser = (username) => {
    const sql = `UPDATE user SET logged=${0}, token=${null} WHERE username='${username}';`;

    con.query(sql, (err, result) => {
        if (err) throw err;
    });
}

module.exports = {
    logoutUser,
    loginUser,
}