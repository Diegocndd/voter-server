const {con} = require('./config');

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

const getAlternativesOfUser = (idPoll, callback) => {
    const sql = `SELECT * FROM alternative WHERE id_poll=${idPoll};`;

    con.query(sql, (err, result) => {
        if (err) 
            callback(err, null);
        else
            callback(null, result);
    });
};

module.exports = {
    createAlternative,
    getAlternatives,
    getAlternativesOfUser,
};
