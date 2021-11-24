const mysql = require('mysql');
const changePasswordDB = require('./changePassword');
const loginDB = require('./login');
const registerDB = require('./register');
const pollDB = require('./poll');
const userDB = require('./user');
const alternativeDB = require('./alternative');
const {con} = require('./config');

const connect = () => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
};

const {getUserData, confirmPassword, deleteAccount} = userDB;

const {addUser} = registerDB;

const {logUser, loginUser, logoutUser} = loginDB;

const {getEmailFromCodLink} = changePasswordDB;

const {addChangePasswordReq, verifyEmail, changePassword, removeRegisterChangePass} = changePasswordDB;

const {getPolls} = pollDB;

const {createPoll} = pollDB;

const {createAlternative, getAlternatives} = alternativeDB;

module.exports = {
    connect,
    addUser,
    loginUser,
    logoutUser,
    createPoll,
    createAlternative,
    getAlternatives,
    getPolls,
    getUserData,
    changePassword,
    addChangePasswordReq,
    verifyEmail,
    getEmailFromCodLink,
    removeRegisterChangePass,
    confirmPassword,
    deleteAccount,
};
