const words = require('./words');

const getRandomWord = function (words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toLowerCase();
}

const users = {
    addUserInfo: function (username) {
        users[username] = {
            guessedLists: {},
            answer: getRandomWord(words),
            invalid: false,
            occured: false,
            empty:false,
            isWon: false
        }
    },

    restartNewGame: function (username) {
        users[username].answer =getRandomWord(words);
    }
};

module.exports = users;