const uuid = require('uuid').v4

const sessions = {};
const userCarts = {}; 

function setSession(username) {
    const sid = uuid(); 
    sessions[sid] = {username};
    if (!userCarts[username]) {
        userCarts[username] = {};
    }
    return sid;
}
function getUsername(sid) {
    return sessions[sid]?.username
}

function getCart(username) {
    return userCarts[username];
}

function updateCart(username, productId, quantity) {
    const cart = userCarts[username];
    if (!cart) return;
    cart[productId] = (cart[productId] || 0) + quantity;
}

function deleteSession(sid) {
    delete sessions[sid];
}
module.exports = { 
    setSession,
    getUsername,
    deleteSession,
    getCart,
    updateCart,}
