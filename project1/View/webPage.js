const words = require('../Model/words');
const dataCheck = require('../Model/dataCheck');
const users = require('../Model/users');

const webPage = {
    loginPage: function() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css">
                <title>Login Page</title>
            </head>
            <body>
                <header>
                    <h1>Please Login for word guessing game!</h1>
                </header>   
                <form class="login-form" action="/login" method="POST">
                    <label>
                        <span>Enter your username:</span>
                        <input type="text" name="username" placeholder="Type your username here">
                    </label>
                    <button type="submit">Login</button>
                </form>
            </body>
            </html>
        `;
    },

    loginFail: function (errors) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="style.css">
            <title>Login Failure</title>
        </head>
        <body>
            <header>
                <h1>Oh!not there yet &#128531;</h1>
            </header>   
            <div class="login-error-messages">
                <p>${errors}</p>
                <p>Please go back to<a href="/"> login page </a>to enter your username!</p>                    
            </div>
        </body>
        </html>
    `
    },


    guessPage: function (username) {
        let wordList = '<p>' + words.join(' | ') + '</p>';
        wordList += '</p>';
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="style.css">
            <title>Guess Word Game</title>
        </head>
        <body>
            <div class="guess-page">
                <header>    
                    <h1>Word Guessing game Starts!</h1>
                </header>
                <p class="user-information">You are logged in as ${username}</p>
                <div class="restart-or-logout-options">
                    <form class="logout-option-form" action="/logout" method="POST">
                        <button type="submit">Logout</button>
                    </form>
                    <form class="restart-option-form" action="/new-game" method="POST">
                        <button type="submit">Restart</button>
                    </form>
                </div>
                <div class="word-list-section">
                    <h2>World List &#128071</h2>
                    <div class="word-list">
                    ${wordList}
                    </div>
                </div>
                <div class="reminder-message">
                <h3>pick your guesses from above list!</h3>
                </div>
                <div>
                    <form class="input-guess-form" action="/guess" method="POST">
                        <label>
                            <input class="input-guess-text" name="guessedWord" placeholder="Enter your guess here">
                        </label>   
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div class="guess-error-message">
                    ${dataCheck.checkUserGuess(username)}
                </div>
                <div class="user-guesses">
                    <p>Your Guesses:</p>
                    ${webPage.guessedWordsPost(username)}
                </div>
            </div>
        </body>
        </html>
        `
    },
    guessedWordsPost: function (username) {
        let userGuessedListHTML = '<ul class="user-guessed-words">';
        const guesses = users[username].guessedLists;
        for (const guess in guesses) {
            const userGuess = guesses[guess]; 
            const userEveryGuessList = `<li>
                                 <div class="word">
                                     <p>Your guess No${userGuess['turns take']} word: <span class="user-guessed-word">${guess}</span> matches ${userGuess['letter matches']} letter with correct answer! Try Again!</p>
                                 </div>
                              </li>`;
            userGuessedListHTML += userEveryGuessList;
        }
        userGuessedListHTML += '</ul>';
        return userGuessedListHTML;
    },

    
    successPage : function(username) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="style.css">
            <title>Winning Game</title>
        </head>
        <body>
            <div class="winning-page">
                <header>    
                    <h1>Congrats!</h1>
                </header>
                <div class="congrats-message">
                <p>Congratulations, ${username}! You have won the game! &#128539</p>
                </div>
                <form class="play-again-form" action="/new-game" method="post">
                    <button type="submit">Play again</button>
                </form>
            </div>
        </body>
        </html>
        `
    }
}

module.exports = webPage;