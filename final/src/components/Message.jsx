import React from 'react';
import './styles/Message.css';

function Message({ messages }) {
    return (
        messages ? <p className="error-message">{messages}</p> : null
    );
}

export default Message;
