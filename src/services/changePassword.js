require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../database');
const generateToken = require('../utils/generateToken');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '181135736532-tvj8rqrjqrtpacgd2rlgvujomkl5kula.apps.googleusercontent.com', // ClientID
  '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', // Client Secret
  'https://developers.google.com/oauthplayground', // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: '1//04K-nD1-mZnGICgYIARAAGAQSNwF-L9IrVroNeC9cP8tNqJMqtqloaB_5K9xuqaS0vxtOgS-se26R4txSOnuqQxsyyZ9Nav7_nEY',
});

const accessToken = oauth2Client.getAccessToken();
// accessToken.then(res => console.log(res.res.data.access_token));
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    type: 'OAuth2',
    clientId: process.env.CLIENT_ID_EMAIL,
    clientSecret: process.env.CLIENT_SECRET_EMAIL,
    refreshToken: process.env.REFRESH_TOKEN_EMAIL,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const mailOptions = (email, link) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: 'Alteração de senha - Voter',
    text: `Olá!\n\nAcesse o link ${link} para modificar sua senha.`,
  };
};

const changePwd = (email, newPassword) => {
  db.changePassword(email, newPassword, (err, res) => {
    if (err) throw err;
  });
}

const createURL = (email) => {
  const token = generateToken.randomValueHex(10);
  const linkNewPassword = `${process.env.BASE_URL}forgot-password?id=${token}`;

  db.addChangePasswordReq(email, token);

  transporter.sendMail(mailOptions(email, linkNewPassword), function(error, info){
    if (error) {
      console.log(error);
    }
  });

  return `${process.env.BASE_URL}forgot-password?id=${token}`;
}

module.exports = {
  changePwd,
  createURL,
}
