const { isValidUsername, addMessage, getAllMessages } = require('../Model/chatDataManager');
const sessions = require('./sessions');

function postMessage(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getUsername(sid) : '';
    if (!sid || !isValidUsername(username)) {
        res.status(401).json({ error: 'auth missing' });
        return;
    }

    const newMessage = req.body.message.trim();
    if (!newMessage) {
        res.status(400).json({ error: "required message" });
        return;
    }
    const userAndMessages = {
        sender: username,
        text: newMessage // 注意这里改为 newMessage
    };

    addMessage(userAndMessages);

    res.json(getAllMessages());
}

module.exports = {
    postMessage
};
