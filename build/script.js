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

const {con} = require('./config');

// insere a requisição de mudança de senha no banco de dados
const addChangePasswordReq = (email, codLink) => {
    const sql = `INSERT INTO change_password (cod_link, email) VALUES ('${codLink}', '${email}');`
    con.query(sql, function (err, res) {
        if (err) throw err;
    });
}

// verifica se email existe no banco de dados
const verifyEmail = (email, callback) => {
    const sql = `SELECT * FROM user WHERE email='${email}'`;

    con.query(sql, function (err, res) {
        if (err) {
            callback(err, false);
        } else {
            if (res.length > 0) {
                callback(null, true);
            } else {
                callback(err, false);
            }
        }
    });
}

// resgata o email para modificar senha
const getEmailFromCodLink = (idLink, callback) => {
    const sql = `SELECT email FROM change_password WHERE cod_link='${idLink}';`;

    con.query(sql, function (err, res) {
        if (err) {
            callback(err, false);
        } else {
            callback(null, res[res.length - 1]);
        }
    });
}

// atualiza a senha do usuário com a nova senha
const changePassword = (email, newPassword, callback) => {
  const sql = `UPDATE user SET password='${newPassword}' WHERE email='${email}';`;

  con.query(sql, (err, result) => {
      if (err) 
          callback(err, null);
      else
          callback(null, result);
  });
};

// limpa registro de solicitação de alteração de senha
const removeRegisterChangePass = (email) => {
  const sql = `DELETE FROM change_password WHERE email='${email}';`;

  con.query(sql, function(err, res) {
      if (err) throw err;
  })
};

module.exports = {
  changePassword,
  addChangePasswordReq,
  getEmailFromCodLink,
  verifyEmail,
  removeRegisterChangePass,
};

require('dotenv').config();
const mysql = require('mysql');

var con  = mysql.createPool({
    connectionLimit : 2,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

module.exports = {
    con,
}
const mysql = require('mysql');
const changePasswordDB = require('./changePassword');
const loginDB = require('./login');
const registerDB = require('./register');
const pollDB = require('./poll');
const userDB = require('./user');
const alternativeDB = require('./alternative');
const vote = require('./vote');
const {con} = require('./config');

const connect = () => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
};

const {getUserData, confirmPassword, deleteAccount, getPublicUsername, updateUser} = userDB;

const {addUser} = registerDB;

const {logUser, loginUser, logoutUser} = loginDB;

const {getEmailFromCodLink} = changePasswordDB;

const {addChangePasswordReq, verifyEmail, changePassword, removeRegisterChangePass} = changePasswordDB;

const {getPollsOfUser, getPoll, deletePoll, isPollClosed, getPublicPolls} = pollDB;

const {createPoll} = pollDB;

const {createAlternative, getAlternatives, getAlternativesOfUser} = alternativeDB;

const {votePoll, verifyVisitor} = vote;

module.exports = {
    connect,
    addUser,
    loginUser,
    logoutUser,
    createPoll,
    createAlternative,
    getAlternatives,
    getPollsOfUser,
    getPoll,
    getUserData,
    changePassword,
    addChangePasswordReq,
    verifyEmail,
    getEmailFromCodLink,
    removeRegisterChangePass,
    confirmPassword,
    deleteAccount,
    getAlternativesOfUser,
    votePoll,
    verifyVisitor,
    getPublicUsername,
    deletePoll,
    updateUser,
    isPollClosed,
    getPublicPolls,
};

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
const {con} = require('./config');

const createPoll = (dataPoll, callback) => {
    const {id_user, title, public, limit_date, qty_options, color} = dataPoll;
    const sql = `INSERT INTO poll (id_user, title, limit_date, public, qty_options, color) VALUES (${id_user}, '${title ? title : null}', '${limit_date ? limit_date : null}', ${public}, ${qty_options}, '${color}');`;
    console.log(dataPoll);
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
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('No token provided!');
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send('Token error');
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send('Token malformated');
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return res.status(401).send('Token invalid');

      req.userId = decoded.id;

      return next();
    });
};
const isEmailValid = (email) => {
    const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regExEmail)) {
        return true;
    }

    return false;
}

const isPasswordValid = (password) => {
    return password.length >= 6;
}

const isBirthValid = (birth) => {
    const regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    if (birth.match(regEx)) {
        return true;
    }

    return false;
}

const register = (userData) => {
    const {name, surname, username, birth, email, password} = userData;

    if (!isPasswordValid(password)) {
        return "The password cannot be shorter than 6 characters.";
    }

    if (!isBirthValid(birth)) {
        return "The date format does not match the YYYY-MM-DD format.";
    }

    if (!isEmailValid(email)) {
        return "The email format does not match the xxxx@yyy.xyz format.";
    }

    return true;
};

const createPoll = (pollData) => {
    const {qty_options} = pollData;

    if(!Number.isInteger(qty_options)) {
        return false;
    }

    return true;
};

module.exports = {
    register,
    createPoll,
    isEmailValid,
    isBirthValid,
    isPasswordValid,
};

const crypto = require('crypto');

const randomValueHex = (len) => {
    return crypto.randomBytes(len).toString('hex');
}

module.exports = {
    randomValueHex,
};

const ISOStringToNormalDate = (oldDate) => {
    return oldDate.split('T')[0] + ' ' + oldDate.split('T')[1].split('.')[0];
};

const isClosedPoll = (limitDatePoll) => {
    const limitDate = limitDatePoll.toString();
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISODate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    const actualDate = ISOStringToNormalDate(localISODate);

    const date1Updated = new Date(actualDate.replace(/-/g,'/'));
    return date1Updated.toString() > limitDate;
};

module.exports = {
    isClosedPoll,
};

const nodemailer = require('nodemailer');
const db = require('../database');
const generateToken = require('../utils/generateToken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diegocndd4@gmail.com',
    pass: 'teste'
  }
});

const mailOptions = (email, link) => {
  return {
    from: 'diegocndd4@gmail.com',
    to: email,
    subject: 'Alteração de senha - Voter',
    text: `Olá! Acesse o link ${link} para modificar sua senha.`,
  };
};

const changePwd = (email, newPassword) => {
  db.changePassword(email, newPassword, (err, res) => {
    if (err) throw err;
  });
}

const createURL = (email) => {
  const token = generateToken.randomValueHex(10);
  const linkNewPassword = `http://localhost:3000/forgot-password?id=${token}`;

  db.addChangePasswordReq(email, token);

  transporter.sendMail(mailOptions(email, linkNewPassword), function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return `http://localhost:3000/forgot-password?id=${token}`;
}

module.exports = {
  changePwd,
  createURL,
}
