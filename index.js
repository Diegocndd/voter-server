const express = require('express');
const db = require('./database/db');
const cors = require('cors');
const crypto = require('crypto');

const changePassword = require('./services/changePassword');

const dataValidation = require('./utils/dataValidation');

const port = 5000;
const app = express();

app.use(require("cors")());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/create-account", "http://localhost:3000/login"],
    credentials: true
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/register', (req, res) => {
    const {name, surname, username, birth, email, password} = req.body;
    const validation = dataValidation.register(req.body);
    if (validation === true) {
        db.addUser(name, surname, username, birth, email, password, 0);
        res.send("Registration completed!");
    } else {
        res.send(validation);
    }
});

app.post('/login', (req, res) => {
    const {login, password} = req.body;

    db.loginUser(login, password, res);
});

app.post('/logout', (req, res) => {
    const {username} = req.body;

    db.logoutUser(username);

    res.send('Logout completed!');
});

app.post('/create-poll', (req, res) => {
    const validation = dataValidation.createPoll(req.body);
    if (validation) {
        db.createPoll(req.body);
    } else {
        res.send('Invalid data.');
    }
    res.send('Created poll!');
});

app.post('/create-alternative', (req, res) => {
    db.createAlternative(req.body);
    res.send('Created alternative!');
});

app.get('/get-alternatives', (req, res) => {
    const {id_poll} = req.body;
    db.getAlternatives(id_poll, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            res.send(data);
        }
    });
})

app.get('/get-polls', (req, res) => {
    const {username, token} = req.body;

    db.getPolls(username, token, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            res.send(data);
        }
    });
});

app.get('/get-user-data', (req, res) => {
    const {username, token} = req.query;

    db.getUserData(username, token, (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
    });
});

app.post('/change-password', (req, res) => {
    const {email} = req.body;

    if (email && req.body.id === undefined) {
        db.verifyEmail(email, (err, result) => {
            if (err) {
                res.status(400).send("O email não possui cadastro.");
            }
            if (result === true) {
                res.status(200).send(changePassword.createURL(email));
            } else {
                res.status(400).send("O email não possui cadastro.")
            }
        })
    } else if (req.body.id && req.body.password) {
        const idLink = req.body.id;
        db.getEmailFromCodLink(idLink, (err, result) => {
            if (result) {
                changePassword.changePwd(result.email, req.body.password);
                db.removeRegisterChangePass(result.email);
                res.status(200).send("Senha modificada com êxito.");
            } else {
                res.status(400).send("Erro ao modificar a senha");
            }
        })
    }

    res.status(400).send("Erro ao modificar a senha");

});

app.listen(port, () => {
    db.connect();
    console.log('Servidor rodando na porta ' + port);
});
