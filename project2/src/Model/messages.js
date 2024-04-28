let messages = [];

function addMessage(message, username) {
    const id = messages.length + 1;
    messages.push({ id, message, username });
    return id;
}

function getMessages() {
    return messages;
}

module.exports = { addMessage, getMessages };
