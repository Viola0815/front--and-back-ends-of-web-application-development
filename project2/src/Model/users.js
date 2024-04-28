function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

const userInfos = {
    'alice': {
      username: 'alice',
      fullName: 'Alice Johnson',
      email: 'alice@example.com',
    },
    'bob': {
      username: 'bob',
      fullName: 'Bob Smith',
      email: 'bob@example.com',
    },
  };

function getUserData(username) {
    return userInfos[username];
}
  
module.exports = {
    isValidUsername,
    getUserData,
};