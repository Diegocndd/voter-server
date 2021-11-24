const {con} = require('./config');

const addUser = (name, surname, username, birth, email, password, logged) => {
    const sql = `INSERT INTO user (name, surname, username, birth, email, password, logged) VALUES ('${name}', '${surname}', '${username}', '${birth}', '${email}', '${password}', ${logged});`
    con.query(sql, function (err, res) {
        if (err) throw err;
    });
}

module.exports = {
  addUser,
}