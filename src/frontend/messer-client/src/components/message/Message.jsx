import React from 'react';

function Message({ sender, time, text }) {
  return (
    <div className="message">
      <div className="message-content">
        <div className="message-header">
            <div className="message-sender">{sender}</div>
            <div className="message-time">{time}</div>
        </div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
}

export default Message;