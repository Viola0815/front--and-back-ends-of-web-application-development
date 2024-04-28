export function analyzeGuess(guessedWord, secretWord) {
    const lowercasedSecretWord = secretWord.toLowerCase();
    const lowercasedGuessedWord = guessedWord.toLowerCase();

    let matchCount = 0;
    let correctOrderCount = 0;
    let correctLettersInOrder = ""; 

    const letterCounts = {};
    for (const letter of lowercasedSecretWord) {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    for (let i = 0; i < lowercasedGuessedWord.length; i++) {
      if (lowercasedGuessedWord[i] === lowercasedSecretWord[i]) {
        correctOrderCount++;
        matchCount++;
        letterCounts[lowercasedGuessedWord[i]]--;
        correctLettersInOrder += lowercasedGuessedWord[i];
      }
    }

    for (let i = 0; i < lowercasedGuessedWord.length; i++) {
      const letter = lowercasedGuessedWord[i];
      if (lowercasedSecretWord.includes(letter) && letterCounts[letter] > 0 && !correctLettersInOrder.includes(letter)) {
        matchCount++;
        letterCounts[letter]--;
      }
    }

    return { matchCount, correctOrderCount, correctLettersInOrder };
}
