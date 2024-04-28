const registeredUsers = {};
const onlineUsers = {};
const messages = [
  { sender: "Amit", text: "You up?" },
  { sender: "Bao", text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos" },
];

function isValidUsername(username) {
    if (!username) {
        return false;
    }
    if (!username.match(/^[A-Za-z0-9_]+$/)) {
        return false;
    }
    return true;
}

function registerUser(username) {
    registeredUsers[username] =username;
}

function addMessage({ sender, text }) {
    if (!sender || !text) {
        return;
    }
    messages.push({ sender: sender, text: text });
}

function getAllMessages() {
    return messages;
}

function loginUser(username) {
    onlineUsers[username] = username ;
}

function getOnlineUsers() {
    return onlineUsers;
}

function getRegisteredUsers() {
    return registeredUsers;
}

function logoutUser(username) {
    delete onlineUsers[username];
}


const ChatService = {
    isValidUsername,
    registerUser,
    addMessage,
    getAllMessages,
    loginUser,
    getOnlineUsers,
    logoutUser,
    getRegisteredUsers
}

module.exports = ChatService;
