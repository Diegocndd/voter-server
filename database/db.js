const mysql = require('mysql');
const generateToken = require('../utils/generateToken');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "vote",
});

const connect = () => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
};

const validateToken = (username, token, callback) => {
    const sqlConfirmToken = `SELECT token, id_user FROM user WHERE username='${username}';`;

    con.query(sqlConfirmToken, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (token == res[0].token){
            callback(null, result);
        } else {
            callback(null, "Autenticação inválida!")
        }
    });
};

const addUser = (name, surname, username, birth, email, password, logged) => {
    const sql = `INSERT INTO user (name, surname, username, birth, email, password, logged) VALUES ('${name}', '${surname}', '${username}', '${birth}', '${email}', '${password}', ${logged});`
    con.query(sql, function (err, res) {
        if (err) throw err;
    });
}

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

}

const loginUser = (login, password, res) => {
    const sqlByUsername = `SELECT password FROM user WHERE username='${login}';`;
    const sqlByEmail = `SELECT password FROM user WHERE email='${login}';`;

    con.query(sqlByUsername, (err, result) => {
        if (err) throw err;
        if (result[0]?.password === password) {
            logUser(login);
            res.send('Logged');
        } else {
            con.query(sqlByEmail, (err, result) => {
                if (result[0]?.password === password) {
                    logUser(login, true);
                    res.send('Logged');
                } else {
                    res.send('Not logged');
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

const createPoll = (dataPoll) => {
    const {id_user, title, free, type_exhibition, public, limit_date, qty_options} = dataPoll;
    const sql = `INSERT INTO poll (id_user, title, free, type_exhibition, limit_date, public, qty_options) VALUES (${id_user}, '${title ? title : null}', ${free}, '${type_exhibition}', '${limit_date ? limit_date : null}', ${public}, ${qty_options});`;

    con.query(sql, (err, result) => {
        if (err) throw err;
    });
}

const createAlternative = (dataAlternative) => {
    const {id_poll, description, qty_votes} = dataAlternative;
    const sql = `INSERT INTO alternative (id_poll, description, qty_votes) VALUES (${id_poll}, '${description}', ${qty_votes});`;

    con.query(sql, (err, result) => {
        if (err) throw err;
    });
}

const getAlternatives = (idPoll, callback) => {
    const sql = `SELECT * FROM alternative WHERE id_poll=${idPoll};`;

    con.query(sql, (err, result) => {
        if (err) 
            callback(err, null);
        else
            callback(null, result);
    });
};

const getPolls = (username, token, callback) => {
    const sqlConfirmToken = `SELECT token, id_user FROM user WHERE username='${username}';`;

    con.query(sqlConfirmToken, (err, res) => {
        if (err) throw err;
        if (token == res[0]?.token) {
            const {id_user} = res[0];
            const sql = `SELECT * FROM poll WHERE id_user=${id_user};`;

            con.query(sql, (err, result) => {
                if (err) 
                    callback(err, null);
                else
                    callback(null, result);
            });
        } else {
            callback(null, "Autenticação inválida!");
        }
    })
};

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

module.exports = {
    connect,
    addUser,
    loginUser,
    logoutUser,
    createPoll,
    createAlternative,
    getAlternatives,
    getPolls,
    getUserData,
};
