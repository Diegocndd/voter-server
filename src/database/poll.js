const {con} = require('./config');

const createPoll = (dataPoll) => {
    const {id_user, title, free, type_exhibition, public, limit_date, qty_options} = dataPoll;
    const sql = `INSERT INTO poll (id_user, title, free, type_exhibition, limit_date, public, qty_options) VALUES (${id_user}, '${title ? title : null}', ${free}, '${type_exhibition}', '${limit_date ? limit_date : null}', ${public}, ${qty_options});`;

    con.query(sql, (err, result) => {
        if (err) throw err;
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

module.exports = {
    getPolls,
    createPoll,
}