import {useState} from 'react';
import {analyzeGuess} from './analyzeWord';

function Game({updateMessage}){ 
  const [userGuessWord, setWord] = useState('');
  const [hasWon, setHasWon] = useState(false);
  const secretWord = "REACT";
  const winningMessage = `${userGuessWord} is the secret word! Congratulations!`; 

  function checkUserGuess(inputWord){
    if (inputWord.length !== secretWord.length) {
      const errorMessage = `Please input a 5-letter word.`;
      updateMessage(errorMessage);
      setWord('');
      return;
    }
    const { matchCount, correctOrderCount, correctLettersInOrder } = analyzeGuess(inputWord, secretWord); 
    if (correctOrderCount !== secretWord.length) {
      const errorMessage = `'${inputWord}' has ${matchCount} matching letters, with ${correctOrderCount} in the correct order. The correct letters in order are: '${correctLettersInOrder}'.`;
      updateMessage(errorMessage);
      setWord('');
      return;
    }
    updateMessage('');
    setHasWon(true); 
  }

  function handlePlayAgain(){
    setHasWon(false);
    setWord('');
    updateMessage('');
  }

  function handleWordGuessSubmit(){
    checkUserGuess(userGuessWord);
  }
  
  return(
    <div>
      {!hasWon ? (
        <div className="word-guessing-form">
          <form>
            <label>
              <span>Enter Your Guess: </span>
              <input type="text" value={userGuessWord} placeholder="Type your guess here" onChange={(e) => setWord(e.target.value)} />
            </label>
            <button className="submit-word-button" type="button" onClick={handleWordGuessSubmit}> Submit </button>
          </form>
        </div>
      ) : (
        <div className="winning-page">
          <p className="winning-message">{winningMessage}</p>
          <button className="play-again-button" type="button" onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Game;


