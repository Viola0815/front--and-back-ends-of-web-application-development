const dataCheck={
    checkUsername: function(username){
        const messagesForInvalidInput = [];
        const userInput = username.replace(/[^A-Za-z0-9_]+/g, '');

        if(userInput === 'dog') {
            messagesForInvalidInput.push('Sorry, you can not use dog as an username! &#128547');
        }
        if (!userInput|| userInput !== username) {
            messagesForInvalidInput.push('This username is invalid! &#128547');
        }
        if (messagesForInvalidInput.length > 0) {
            return messagesForInvalidInput;
        } else {
            return '';
        }
    }
}
module.exports = dataCheck;