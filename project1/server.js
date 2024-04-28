const express = require('express');
const cookieParser = require('cookie-parser');
const app = express(); 
const PORT = 3000;
const authController = require('./Controller/authController'); 

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));

app.get('/', authController.homePage);
app.post('/login', authController.login);
app.post('/guess', authController.guessPage);
app.post('/new-game', authController.newGame);
app.post('/logout', authController.logout);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
