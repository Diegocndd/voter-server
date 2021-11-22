const express = require('express');
const db = require('./database/db');
const dataValidation = require('./utils/dataValidation');

const port = 3000;
const app = express();

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
    // const {id_poll} = req.body;
    // db.getAlternatives(id_poll, function (err, data) {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         res.send(data);
    //     }
    // });
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
    const {username, token} = req.body;

    db.getUserData(username, token, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.listen(port, () => {
    db.connect();
    console.log('Servidor rodando na porta ' + port);
});
