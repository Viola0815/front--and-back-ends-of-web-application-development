const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const webPage = require('./webPage');
const dataCheck = require('./dataCheck');


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};
const storedWord={};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        res.send(webPage.LoginSuccessHTML(username,storedWord[username]));
        return;
    }

    res.send(webPage.loginHTML());
});

app.post('/change', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        const newNickname = req.body.nickname.trim(); 
        if (newNickname !== '') {
            storedWord[username] = newNickname;
        }
        res.redirect('/');
        return;
    }
    
    res.redirect('/');
});

app.post('/login', (req, res) => {
    const userName = req.body.username.trim();
    const errors = dataCheck.checkUsername(userName);
    if (errors.includes('The username you put is invalid!')) {
        res.status(403).send(webPage.LoginFailureHTML(errors));
        return;
    }
    if(errors){
        res.status(400).send(webPage.LoginFailureHTML(errors));
        return;
    }
    const sid = uuidv4();
    sessions[sid] = {username:userName};
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));