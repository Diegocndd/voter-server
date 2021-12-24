const {con} = require('./config');
const {isClosedPoll} = require('../utils/isClosedPoll');

const verifyVisitor = (idVisitor, idPoll, callback) => {
    const sql = `SELECT * FROM votes WHERE id_visitor='${idVisitor}' AND id_poll='${idPoll}'`;
    const sql2 = `SELECT * FROM poll WHERE id_poll=${idPoll} AND limit_date > LOCALTIME()`;

    con.query(sql, (err, result) => {
        if (err) throw callback(err, null);

        if (result.length > 0) {
            callback(null, 'Visitor already voted');
        } else {
            con.query(sql2, (err2, result2) => {
                if (err2) throw callback(err, null);
                if (result2.length === 0) {
                    callback(null, 'Voting is closed');
                } else {
                    callback(null, 'Allowed')
                }
            })
        }
    })
}

const registerVisitor = (idVisitor, idPoll, callback) => {
    const sql = `INSERT INTO votes (id_visitor, id_poll) VALUES ('${idVisitor}','${idPoll}')`;

    con.query(sql, (err, result) => {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

const votePoll = (dataPoll, callback) => {
    const {idAlternative, idPoll, idVisitor} = dataPoll;
    const sql = `UPDATE alternative SET qty_votes=qty_votes+1 WHERE id_alternative=${idAlternative} AND id_poll=${idPoll};`;
    const sqlUpdatePoll = `UPDATE poll SET qty_votes=qty_votes+1 WHERE id_poll=${idPoll};`

    verifyVisitor(idVisitor, idPoll, (error, result) => {
        if (error) callback(error, null);
        if (result === 'Allowed') {
            con.query(sql, (err, res) => {
                if (err) throw callback(err, null);
                con.query(sqlUpdatePoll, (errUpdate, resUpated) => {
                    if (resUpated) {
                        registerVisitor(idVisitor, idPoll, (errRegister, resRegister) => {
                            if (resRegister) {
                                callback(null, 'Vote complete');
                            }
                        })
                    } else if (errUpdate) {
                        callback(errUpdate, null);
                    }
                });
            })
        } else if (result === 'Voting is closed') {
            callback('Voting is closed', null);
        } else {
            callback('Visitor already voted', null);
        }
    })
};

module.exports = {
    votePoll,
    verifyVisitor,
}