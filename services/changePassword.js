const nodemailer = require('nodemailer');
const db = require('../database/db');
const generateToken = require('../utils/generateToken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

const mailOptions = (email, link) => {
  return {
    from: '',
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
