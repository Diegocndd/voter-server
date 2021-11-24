const {con} = require('./config');

const generateToken = require('../utils/generateToken');

const logUser = (login, isLoginEmail = false) => {
    let sql;
    const token = generateToken.randomValueHex(15);

    if (isLoginEmail) {
        sql = `UPDATE user SET logged=${1}, token='${token}' WHERE email='${login}';`;
    } else {
        sql = `UPDATE user SET logged=${1}, token='${token}' WHERE username='${login}';`;
    }

    con.query(sql, (err, result) => {
        if (err) throw err;
    });

    return token;
}

const loginUser = (login, password, res) => {
    const sqlByUsername = `SELECT password FROM user WHERE username='${login}';`;
    const sqlByEmail = `SELECT password FROM user WHERE email='${login}';`;

    con.query(sqlByUsername, (err, result) => {
        if (err) throw err;
        if (result[0]?.password === password) {
            let token = logUser(login);
            res.status(200).send(token);
        } else {
            con.query(sqlByEmail, (err, result) => {
                if (result[0]?.password === password) {
                    let token = logUser(login, true);
                    res.status(200).send(token);
                } else {
                    res.status(400).send({
                        message: 'Não foi possível fazer login',
                    });
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
    logUser,

}