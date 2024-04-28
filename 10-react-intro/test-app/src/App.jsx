import {useState} from 'react';
import ActiveUserPanel from './ActiveUserPanel';
import Login from './Login';
import Message from './Message';
import Game from './Game';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, updateMessage] = useState('');

  function onLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
  }

  function onMessageReceived(messages) {
    updateMessage(messages);
  }

  function onLogout() {
    setIsLoggedIn(false);
    updateMessage('');
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Word Guessing Game</h1> 
      </header>
      {isLoggedIn ? (
        <div className="after-login-site">
          <ActiveUserPanel username={username} onLogout={onLogout} />
          <Game updateMessage={onMessageReceived} />
          <Message messages={messages} />
        </div>
      ) : (
        <div className="attempt-login-site">
          <Login onLogin={onLogin} updateMessage={onMessageReceived} />
          <Message messages={messages} />
        </div>
      )}
    </div>
  );
  
}

export default App;