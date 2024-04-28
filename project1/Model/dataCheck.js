const users = require('./users');

const dataCheck={
    checkUsername: function(username){
        const messagesForInvalidUsernameInput = [];
        const userInput = username.replace(/[^A-Za-z0-9_]+/g, '');

        if(userInput === 'dog') {
            messagesForInvalidUsernameInput.push('Sorry, you can not use dog as an username! &#128547');
        }
        else if (userInput !== username) {
            messagesForInvalidUsernameInput.push('This username is invalid! &#128547');
        }
        else if (!userInput) {
            messagesForInvalidUsernameInput.push('Username is required! &#128547');
        }
        else if (messagesForInvalidUsernameInput.length > 0) {
            return messagesForInvalidUsernameInput;
        } else {
            return '';
        }
        return messagesForInvalidUsernameInput;
    },

    checkUserGuess: function (username) {
        const messagesForInvalidUserGuessInput = [];

        if(users[username].invalid){
            messagesForInvalidUserGuessInput.push('Your guess is not in the word list, please check the word list!');
        } 
        else if (users[username].occured) {
            messagesForInvalidUserGuessInput.push('You already guessed this word, it is not the correct answer, please pick another one from the word list!');
        }
        
        else if(users[username].empty){
            messagesForInvalidUserGuessInput.push('You have to guess a word from the list!');
        }else{
            return ``;
        }  
        return messagesForInvalidUserGuessInput;   
    },

    correctGuessedLetters: function (username, guessedWord) {
        const answer = users[username].answer;
        const lowercasedWord = answer.toLowerCase();
        const lowercasedGuess = guessedWord.toLowerCase();
        const wordLetterCounts = {};
        const guessLetterCounts = {};

        for (let i = 0; i < lowercasedWord.length; i++) {
            const letter = lowercasedWord[i];
            wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
          }
        
          for (let i = 0; i < lowercasedGuess.length; i++) {
            const letter = lowercasedGuess[i];
            guessLetterCounts[letter] = (guessLetterCounts[letter] || 0) + 1;
          }
        
          let commonLettersCount = 0;
          for (const letter in wordLetterCounts) {
            const wordCount = wordLetterCounts[letter];
            const guessCount = guessLetterCounts[letter] || 0; 
        
            commonLettersCount += Math.min(wordCount, guessCount);
          }
        
          return commonLettersCount; 
    },
    calculateTurns: function(username, users) {
        if (users && users[username] && users[username].guessedLists) {
            return Object.keys(users[username].guessedLists).length + 1;
        } else {
            return 1;
        }
    },

}
module.exports = dataCheck;