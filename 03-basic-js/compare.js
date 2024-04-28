"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
const lowercasedWord = word.toLowerCase();
  const lowercasedGuess = guess.toLowerCase();
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
}

