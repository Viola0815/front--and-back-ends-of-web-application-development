import React, { useState } from 'react';
import './styles/CustomQuestionForm.css';

function CustomQuestionForm({ onSubmitted, onContinueShopping, onGoBack }) {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/; 
    return re.test(email.trim().toLowerCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim()) {
      setError('You must enter a question.');
      return;
    }
    if (!validateEmail(email)) {
      setError('You must enter a valid email address.');
      return;
    }
    if (!question.trim() || !email) {
      setError('You must fill in both fields.');
      return;
    }
    setError(''); 
    onSubmitted(email, question);
  };

  return (
    <div className="custom-question-page">
      <div className="header-section">
        <h2>Let our team know your Other Questions! </h2>
        <div className="options-buttons">
          <button type="button" onClick={onGoBack}>Back to FAQs</button>
          <button type="button" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </div>
      <div className="custom-question-form">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="question-form">
            <label htmlFor="question">Your Question:</label>
            <input id="question" value={question} placeholder="Type your question here!" onChange={(e) => setQuestion(e.target.value)}/>
          </div>
          <div className="email-form">
            <label htmlFor="email">Your Email:</label>
            <input id="email" value={email} placeholder="Type your email here!" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-submission">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomQuestionForm;
