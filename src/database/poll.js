const {con} = require('./config');

const createPoll = (dataPoll, callback) => {
    const {id_user, title, free, public, limit_date, qty_options} = dataPoll;
    const sql = `INSERT INTO poll (id_user, title, free, limit_date, public, qty_options) VALUES (${id_user}, '${title ? title : null}', ${free}, '${limit_date ? limit_date : null}', ${public}, ${qty_options});`;

    con.query(sql, (err, result) => {
        if (err) throw callback(err, null);
        else callback(null, result.insertId)
    });
};

const getPollsOfUser = (id, callback) => {
    const sql = `SELECT * FROM poll WHERE id_user=${id};`;

    con.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const getPoll = (id, callback) => {
    const sql = `SELECT * FROM poll WHERE id_poll=${id};`;

    con.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0]);
        }
    });
};

const releaseForeignKey = () => {
    const sql = 'SET FOREIGN_KEY_CHECKS=0;'
    con.query(sql);
}

const isPollClosed = (idPoll, callback) => {
    const sql = `SELECT * FROM poll WHERE limit_date > LOCALTIME() AND id_poll=${idPoll};`;
    con.query(sql, (err, result) => {
        if (err) callback(err, null);
        if (result.length === 0) callback(null, 'Yes');
        else callback(null, 'No');
    })
};

const deletePoll = (idUser, idPoll, callback) => {
    const sql = `DELETE FROM poll WHERE id_poll=${idPoll} AND id_user=${idUser};`;

    releaseForeignKey();
    con.query(sql, (err, result) => {
        if (err) callback(err, null);
        else callback(null, result);
    })
}

const getPublicPolls = (callback) => {
    const sql = 'SELECT * FROM poll WHERE limit_date > LOCALTIME() AND public=1 ORDER BY qty_votes DESC;';

    con.query(sql, (err, result) => {
        if (err) callback(err, null);
        if (result) callback(null, result);
    })
}

module.exports = {
    getPollsOfUser,
    getPoll,
    createPoll,
    deletePoll,
    isPollClosed,
    getPublicPolls,
}