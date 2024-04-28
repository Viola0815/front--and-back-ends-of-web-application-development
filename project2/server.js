const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

const { isValidUsername, registerUser, addMessage, getAllMessages, loginUser, getOnlineUsers, logoutUser,getRegisteredUsers } = require("./src/Model/chatDataManager");
const sessions = require("./src/Model/sessions");

app.get("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getUsername(sid) : "";
    if (!sid || !isValidUsername(username)) {
        res.status(401).json({ error: "auth missing" });
        return;
    }
    res.json({ username });
});

app.post("/api/session", (req, res) => {
    const username = req.body.username.trim();

    if (!isValidUsername(username)) {
        res.status(400).json({ error: "required username" });
        return;
    }

    if (username === "dog") {
        res.status(403).json({ error: "auth insufficient" });
        return;
    }

    const sid = sessions.setSession(username);
    registerUser(username); 
    loginUser(username); 

    res.cookie("sid", sid);
    res.json(getOnlineUsers()); 
});

app.delete("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getUsername(sid) : "";

    if (sid) {
        res.clearCookie("sid");
    }

    if (username) {
        sessions.deleteSession(sid);
        logoutUser(username); 
    }

    res.json({ username });
});

app.get("/api/onlineUsers", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getUsername(sid) : '';
    if (!sid || !isValidUsername(username)) {
        res.status(401).json({ error: 'auth missing' });
        return;
    }

    res.json(getOnlineUsers()); 
});

app.get("/api/existUsers", (req, res) => {
    res.json(getRegisteredUsers()); 
});


app.get("/api/messages", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getUsername(sid) : '';
    if (!sid || !isValidUsername(username)) {
        res.status(401).json({ error: 'auth missing' });
        return;
    }

    res.json(getAllMessages())
});

app.post("/api/messages", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getUsername(sid) : '';
    if (!sid || !isValidUsername(username)) {
        res.status(401).json({ error: 'auth missing' });
        return;
    }

    const newMessage = req.body.message.trim();
    if (!newMessage) {
        res.status(400).json({ error: "required message" })
        return
    }
    const userAndMessages = {
        sender: username,
        text: newMessage
    };

    addMessage(userAndMessages);

    res.json(getAllMessages()) 
});




app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
