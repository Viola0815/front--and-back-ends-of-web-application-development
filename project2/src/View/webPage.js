export function renderMain({ state, mainEl }) {
    const html = `
        ${logginSite(state)}
        ${userSendMessageOrLogout(state)}
     
    `;
    mainEl.innerHTML = html;
}


function logginSite (state) {
    const displayError=state.error ? `<div class="error">${state.error}</div>` : "";
    if (state.isLoggedIn) {
        return ``;
    }
    return `
        ${getLoginHtml(state)}
        <div class="header">
            <h1>Please login to start our channel!</h1>  
        </div>
        <div class="login">
            <form class="login-form">
                <label for="username">Enter your username:</label>
                <input type="text" id="username" class="login-username" name="username" placeholder="Type your username here">
                <div class="error">${displayError}</div>
                <button class="login-button">Submit</button>
            </form>
        </div>

    `;
}

function showUserWelcomeMessage(state) {
    if (!state.isLoggedIn) {
        return "";
    }
    return `
        <div class="header">
            <h1>Welcome to the chatting channel, ${state.username}!</h1>
        </div>
    `;
}


export function renderChatArea({ state, chatEl }) {
    let html = ``; 

    if (state.isLoggedIn) {
        html = `
            ${showChatAndUsers(state)}
        `;
    }

    chatEl.innerHTML = html;
}

function userSendMessageOrLogout(state) {
    if (!state.isLoggedIn) {
        return ``; 
    }
    
    const displayError = state.error ? `<div class="error">${state.error}</div>` : "";
    return `
        <div class="sendMessageOrLogout">
            <div class="sendMessage">
                <form class="chatSending">
                    <label for="messageInput">Type your new message here:</label>
                    <input type="text" id="messageInput" class="message" name="message" placeholder="Type your new message here">
                    <button class="send-button">Send</button>
                    ${displayError}
                </form>
    </div>
    
            <div class="logout">
                <form class="UserLogout">
                    <button class="logout-button">Logout</button>
                </form>
            </div>
        </div>
    `;
}

function showAllMessages(state) {
    if (!state.isLoggedIn || !state.messages) {
        return "";
    }

    let messagesHtml = '<ol class="messages">';
    
    for (let i = 0; i < state.messages.length; i++) {
        messagesHtml += `
            <li>
                <div class="message">
                    <span class="username">${state.messages[i].sender}</span>
                    <p class="messageText">${state.messages[i].text}</p>
                </div>
            </li>
        `;
    }

    messagesHtml += '</ol>';
    return messagesHtml;
}

function showChatAndUsers(state) {
    const messagesHtml = showAllMessages(state);
    const usersHtml = showUserWelcomeMessage(state);
    const onlineUsersHtml = Object.keys(state.users).map(user => `<li>${user}</li>`).join('');
    const chattingSession = `
        <div class="online-users">
            <h2>Online Users</h2>
            <ul>${onlineUsersHtml}</ul>
        </div>
        <div class="chat-container">
            ${usersHtml}
            ${messagesHtml}
        </div>
    `;

    return chattingSession;
}

function getLoginHtml(state) {
    if(state.isLoginPending) {
      return `
        <div class="loadingMessage">Loading user...</div>
      `
    }
    return '';
  }