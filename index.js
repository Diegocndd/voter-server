require('dotenv').config();
const express = require('express');
const db = require('./src/database');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('./src/config/auth.json');
const authMiddleware = require('./src/middlewares/auth');
const changePassword = require('./src/services/changePassword');
const dataValidation = require('./src/utils/dataValidation');

const app = express();

const port = process.env.PORT || 5000;

app.use(require("cors")());

app.use(
  cors({
    origin: [`${process.env.BASE_URL}`, `${process.env.BASE_URL}create-account`, `${process.env.BASE_URL}login`, `${process.env.BASE_URL}forgot-password`],
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

    db.loginUser(login, password, (err, result) => {
        if (err) {
            res.status(400).send('User not found');
        } else {
            if (result) {
                const token = jwt.sign({ id: result }, authConfig.secret);
                res.status(200).send(token);
            } else {
                res.status(400).send('User not found');
            }
        }
    });

});

app.post('/logout', (req, res) => {
    const {username} = req.body;

    db.logoutUser(username);

    res.send('Logout completed!');
});

app.post('/create-poll', (req, res) => {
    authMiddleware(req, res, () => {
        const validation = dataValidation.createPoll(req.body);
        if (validation) {
            db.createPoll(req.body, (err, result) => {
                if (err) {
                    res.status(400).send('Invalid data.');                
                } else {
                    res.status(200).send(result.toString());
                }
            });
        } else {
            res.status(400).send('Invalid data.');
        }
    });
});

app.post('/create-alternative', (req, res) => {
    authMiddleware(req, res, () => {
        db.createAlternative(req.body);
        res.send('Created alternative!');
    });
});

app.post('/update-user', (req, res) => {
    authMiddleware(req, res, () => {
        if (req.body.id_user === req.userId) {
            db.updateUser(req.body, (err, result) => {
                if (result?.affectedRows > 0) {
                    res.status(200).send('User updated');
                } else {
                    res.status(400).send('Cannot update user');
                }
            });
        } else {
            res.status(401).send('User not authorized!');
        }
    });
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

app.get('/get-public-polls', (req, res) => {
    db.getPublicPolls((err, result) => {
        if (err) res.status(400).send('Error fetching votes.');
        if (result) res.status(200).send(result);
    });
})

app.get('/get-public-alternatives', (req, res) => {
    const {id_poll} = req.query;
    db.getAlternativesOfUser(id_poll, function (err, data) {
        if (err) {
            res.status(400).send('Error getting alternatives');
        } else {
            res.status(200).send(data);
        }
    });
})

app.get('/get-polls', (req, res) => {
    authMiddleware(req, res, () => {
        let id = req.userId;
        db.getPollsOfUser(id, function (err, data) {
            if (err) {
                console.error(err);
            } else {
                res.status(200).send(data);
            }
        });
    });
});

app.get('/get-poll', (req, res) => {
    let {id_poll} = req.query;

    db.getPoll(id_poll, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send('No poll found')
            }
        }
    });
});

app.get('/get-user-data', (req, res) => {
    authMiddleware(req, res, () => {
        let id = req.userId;
        db.getUserData(id, (err, data) => {
            if (err) throw err;
            res.status(200).send(data[0]);
        });
    });
});

app.post('/delete-account', (req, res) => {
    authMiddleware(req, res, () => {
        let id = req.userId;
        if (id === req.body.id_user) {
            db.deleteAccount(id, (err, data) => {
                if (err) {
                    res.status(400).send('Cannot delete account');
                } else {
                    res.status(200).send('Account deleted');
                }
            });
        } else {
            res.status(401).send('Cannot delete account');
        }
    });
})

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
});

app.post('/vote-poll', (req, res) => {
    db.votePoll(req.body, (err, result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send(err);
        }
    });
});

app.post('/visiter-already-vote', (req, res) => {
    const {idVisitor, idPoll} = req.body;
    db.verifyVisitor(idVisitor, idPoll, (err, result) => {
        if (result === 'Allowed') {
            res.status(200).send('False');
        } else if (result === 'Visitor already voted') {
            res.status(200).send('True');
        } else {
            res.status(400).send('False')
        }
    });
})

app.post('/delete-poll', (req, res) => {
    authMiddleware(req, res, () => {
        let id = req.userId;
        let {id_poll} = req.body;

        db.deletePoll(id, id_poll, (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
                res.status(400).send('Not allowed or does not exist this poll');
            } else {
                res.status(200).send('Deleted poll');
            }
        });
    });
})

app.get('/get-username', (req, res) => {
    const {id_user} = req.query;
    db.getPublicUsername(id_user, (err, result) => {
        if (err) {
            res.status(400).send('Failed to get username');
        } else if (result) {
            res.status(200).send(result);
        }
    })
});

app.get('/is-closed-poll', (req, res) => {
    const {id_poll} = req.query;
    db.isPollClosed(id_poll, (err, result) => {
        if (err) res.status(400).send(err);
        if (result) res.status(200).send(result);
    });
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
