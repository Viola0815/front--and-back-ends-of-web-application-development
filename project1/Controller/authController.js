const uuidv4 = require('uuid').v4;
const webPage = require('../View/webPage');
const users = require('../Model/users');
const words = require('../Model/words');
const dataCheck=require('../Model/dataCheck');

const sessions = {};

const authController={

login:function(req, res) {
    const userName = req.body.username.trim();
    const errors = dataCheck.checkUsername(userName);
    if (errors.includes('Sorry, you can not use dog as an username! &#128547')) {
        res.status(403).send(webPage.loginFail(errors));
        return;
    }
    if (errors){
        res.status(400).send(webPage.loginFail(errors));
        return;
    }
    const sid = uuidv4();
    sessions[sid] = {username:userName};
    res.cookie('sid', sid);
    res.redirect('/');
},

homePage :function(req, res) {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        if (!users[username]) {
            users.addUserInfo(username); 
        }
        const userInfo = users[username];
        if (userInfo.isWon) {
            res.send(webPage.successPage(username));
            return; 
        } 
        const answer = userInfo.answer; 
        console.log(`Username: ${username}, secret word: ${answer}`);
        res.send(webPage.guessPage(username, userInfo)); 
    } else {
   
        res.send(webPage.loginPage());
    }
},

guessPage:function(req,res)  {
    let guessedWord = req.body.guessedWord.trim().toLowerCase();
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    const answer = users[username].answer.toLowerCase();;
    users[username].invalid = false;
    users[username].occured = false;
    users[username].empty = false;
    if (!guessedWord) {
        users[username].empty = true;
        res.redirect('/');
    } else if (!words.includes(guessedWord)) {
        users[username].invalid = true;
        res.redirect('/');
    } else if (users[username].guessedLists[guessedWord]) {
        users[username].occured = true;
        res.redirect('/');
    } else if (guessedWord === answer) {
        users[username].isWon = true;
        res.redirect('/');
    } else {
        const matches = dataCheck.correctGuessedLetters(username, guessedWord);
        const turns= dataCheck.calculateTurns(username,users);
        users[username].guessedLists[guessedWord] = {'letter matches': matches,'turns take': turns
        }
        res.redirect('/');
    }
},

newGame:function(req, res) {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        users.restartNewGame(username);
        users[username].guessedLists = {};
        users[username].isWon = false;
        res.redirect('/');
    } else {
        res.send(webPage.loginFail("you are not logged in"));
    }
},

logout:function(req, res)  {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
}

};

module.exports = authController;
