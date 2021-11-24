const {con} = require('./config');

const getUserData = (username, token, callback) => {
    const sql = `SELECT * FROM user WHERE username='${username}' AND token='${token}';`;

    con.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const deleteAccount = (username, email, callback) => {
    const sql = `DELETE FROM user WHERE username='${username}' AND email='${email}';`;

    con.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    });
}

// confirmar se senha é a do usuário
const confirmPassword = (username, email, password, callback) =>  {
    const sql = `SELECT password FROM user WHERE username='${username}' AND email='${email}';`;

    con.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            if (result[0].password === password) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    });
};

module.exports = {
    getUserData,
    deleteAccount,
    confirmPassword,
};
