const chatWeb = {
  chatPage: function(chat) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="style.css">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}          
            ${chatWeb.getMessageList(chat)}       
            ${chatWeb.getOutgoingSection(chat)}   
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
        chat.messages.map(message => {
            const avatarPath = `images/${message.sender}.jpg`;
            return `
                <li>
                    <div class="sender-and-message-container">
                        <div class="sender-information">
                            <img src="${avatarPath}" alt="${message.sender}'s Avatar">
                            <span class="username">${message.sender}</span>
                        </div>
                        <div class="sender-message">
                            <span class="user-text">${message.text}</span>
                        </div>          
                    </div>
                </li>`;
        }).join('') +
        `</ol>`;
},

  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="user-name">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoingSection: function() {
    return `
    <form action="/chat" method="POST">
      <label>
        <input type="hidden" name="username" value="Bao">
      </label>
      <label>
        <input type="textarea" name="text" placeholder="Type your new message here">
      </label>
      <button type="submit">Send</button>
    </form>
    `
  }
};
module.exports = chatWeb;
