// FAQToggle.jsx
import React, { useState } from 'react';
import FAQ from './FAQ'; // 确保路径正确

function FAQToggle() {
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <div>
      <button onClick={() => setShowFAQ(!showFAQ)}>Common Questions You May Have</button>
      {showFAQ && <FAQ />}
    </div>
  );
}

export default FAQToggle;
