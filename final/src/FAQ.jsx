import React, { useState } from 'react';
import faqData from './faqData'; 

function FAQ() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (index === activeQuestionIndex) {
      setActiveQuestionIndex(null);
    } else {
      setActiveQuestionIndex(index);
    }
  };

  return (
    <div>
      {faqData.map((item, index) => (
        <div key={index}>
          <button onClick={() => toggleAnswer(index)}>{item.question}</button>
          {index === activeQuestionIndex && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
