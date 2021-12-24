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
