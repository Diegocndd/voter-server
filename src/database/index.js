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
