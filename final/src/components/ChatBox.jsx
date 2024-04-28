import React, { useState } from 'react';
import faqData from '../utils/faqData';
import CustomQuestionForm from './CustomQuestionForm';
import './styles/ChatBox.css';

function ChatBox({ onClose }) {
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you today?", sender: 'bot' }]);
  const [view, setView] = useState('faq');

  const handleQuestionClick = (question, answer) => {
    if (question === "Other questions") {
      setView('customForm');
    } else {
      setMessages(prev => [
        ...prev, 
        { text: question, sender: 'you' },
        { text: answer, sender: 'bot' }
      ]);
    }
  };

  const handleCustomFormSubmitted = (email) => {
    setMessages(prev => [
      ...prev,
      { text: `We have received your question, and our customer service will respond to you as soon as possible at ${email}.`, sender: 'bot' }
    ]);
    setView('faq');
  };

  const handleGoBack = () => {
    setView('faq');
  };

  if (view === 'customForm') {
    return <CustomQuestionForm 
              onSubmitted={handleCustomFormSubmitted}
              onContinueShopping={onClose}
              onGoBack={handleGoBack}
           />;
  }

  return (
    <div className="chat-box-container">  
      <div className="chat-header">
        <h2>FAQs</h2>
        <button className="continue-shopping-button" onClick={onClose}>Continue shopping</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.sender === 'bot' ? 'Bot:' : 'You:'} {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-questions">
        {faqData.map((item, index) => (
          <button key={index} onClick={() => handleQuestionClick(item.question, item.answer)}>
            {item.question}
          </button>
        ))}
        <button onClick={() => setView('customForm')}>Other questions</button>
      </div>
    </div>
  );
}

export default ChatBox;
