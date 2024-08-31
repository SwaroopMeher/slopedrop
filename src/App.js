import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './App.css';

const messages = [
  "Discover Travel Plans from Locals and Fellow Travelers.",
  "Earn by Creating Travel Plans That People Love.",
  "Connect with Travelers by Offering Your Services."
];

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    
    if (isTyping) {
      if (text.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setText(currentMessage.slice(0, text.length + 1));
        }, 90);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => setIsTyping(false), 6500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 75); // Kept at 75ms for erasing
        return () => clearTimeout(timeout);
      } else {
        const nextIndex = (messageIndex + 1) % messages.length;
        setMessageIndex(nextIndex);
        setIsTyping(true);
        const timeout = setTimeout(() => setText(''), 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, messageIndex, isTyping]);

  return (
    <h1 className="typing" style={{ animation: `blink-caret 0.75s step-end infinite` }}>
      {text}
    </h1>
  );
};

const App = () => {
  return (
    <div className="container">
      <header>
        <div className="logo">\slopedrop</div>
      </header>

      <main>
        <TypingEffect />
      </main>

      <div className="coming-soon">Coming Soon</div>
      
      <div className="social-icons">
        <a href="https://www.instagram.com/slopedrop.ai" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.linkedin.com/company/slopedrop" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      
      <div className="copyright">&copy; 2024 Slopedrop</div>
    </div>
  );
};

export default App;
