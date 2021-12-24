const {con} = require('./config');

const getUserData = (id, callback) => {
    let sql = `SELECT * FROM user WHERE id_user='${id}';`;

    con.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const releaseForeignKey = () => {
    const sql = 'SET FOREIGN_KEY_CHECKS=0;'
    con.query(sql);
}

const deletePollsFromUser = (id_user, callback) => {
    const sql = `DELETE FROM poll WHERE id_user=${id_user};`;
    con.query(sql);
}

const deleteAccount = (id_user, callback) => {
    const sql = `DELETE FROM user WHERE id_user=${id_user};`;

    releaseForeignKey();
    deletePollsFromUser(id_user);

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

const getPublicUsername = (idUser, callback) => {
    const sql = `SELECT username FROM user WHERE id_user=${idUser};`;

    con.query(sql, (err, result) => {
        if (err) callback(err, null);
        else callback(null, result[0].username);
    })
}

const updateUser = (userData, callback) => {
    const {name, email, surname, password, birth, id_user, username} = userData;
    if (name && email && surname && password && birth && id_user && username) {
        const sql = `UPDATE user SET name='${name}', email='${email}', surname='${surname}', username='${username}', password='${password}', birth='${birth}' WHERE id_user=${id_user};`;
        con.query(sql, (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    } else {
        callback('Cannot update user', null);
    }
};

module.exports = {
    getUserData,
    deleteAccount,
    confirmPassword,
    getPublicUsername,
    updateUser,
};
