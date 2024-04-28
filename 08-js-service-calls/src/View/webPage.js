import {getUserData} from '../Model/state';

export default function render(rootEl) {
    const { username, storedWord, error } = getUserData();
    const displayError = error ? `<div class="error">${error}</div>` : '';
    const displayInfo = storedWord ? storedWord : "<span class='no-word-set'> no word set yet</span>";
    
    function loginPage() {
        return `
            <div class="header">
                <h1>Please Login</h1>  
            </div>
            <div class="login-site">
                <label for="username">Enter Your Username:</label>
                <input type="text" class="username" id="username" placeholder="Type your username here">
                <div class="error">${displayError}</div> 
                <button class="login-button">Login</button>
            </div>
        `;
    }

    function userInfoPage(username, displayInfo) {
        return `
            <div class="header">
                <h1>Welcome, ${username}</h1>  
            </div>
            <div class="all-info">
                <div class="username-and-word">
                    <p>Username: <span>${username}</span></p>
                    <p>Word: <span>${displayInfo}</span></p> 
                </div>  
                <div class="word-change">
                    <label for="word">Change Your Word:</label>
                    <input type="text" class="word" id="word" placeholder="Type your new word here">
                    <div class="error">${displayError}</div> 
                    <button class="word-change-button">Change</button>
                </div> 
                <div class="logout">       
                    <button class="logout-button">Logout</button>     
                </div>             
            </div>
        `;
    }
    if (!username) {
        rootEl.innerHTML = loginPage();
    } else {
        rootEl.innerHTML = userInfoPage(username, displayInfo);
    }

}
  