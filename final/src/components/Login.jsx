import {useState} from 'react';
import {fetchLogin} from '../services'; 
import './styles/Login.css';

function LoginValidation(updateMessage, onLogin) {
    const [username, setUsername] = useState('');
  
    function updateUsername(e) {
      setUsername(e.target.value);
    }
  
    function validateUsername() {
      const regex = /[^A-Za-z0-9_]+/g;
      if (!username || username.match(regex)) {
        const errorMessage = "This username is invalid!";
        updateMessage(errorMessage);
        return false; 
      }
      if (username.toLowerCase() === 'dog') {
        const errorMessage = "Sorry, you can not use dog as an username!";
        updateMessage(errorMessage);
        return false; 
      }
      updateMessage('');
      return true; 
    }

    function processLogin() {
        if (validateUsername()) {
          fetchLogin(username) 
            .then(() => {
              onLogin(username); 
              updateMessage('');
            })
            .catch((err) => {
              updateMessage(err.error || 'Login failed. Please try again.');
            });
        }
      }
    
  
    return { username, updateUsername, processLogin };
  }
    
function Login({ onLogin, updateMessage }) {
  const { username, updateUsername, processLogin } = LoginValidation(updateMessage, onLogin);

  return (
    <div className="login-site">
      <form>
        <label>
          <span>Enter your username: </span>
          <input type="text" value={username} placeholder="Type your username here!" onInput={updateUsername}/>
        </label>
        <button className="login-button" type="button" onClick={processLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;

