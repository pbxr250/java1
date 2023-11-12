import React, { useState, useContext, useEffect } from 'react';
import Message from '../message/Message';
import { WebsocketContext } from '../socket/WebsocketProvider';

function Chat() {
  const [wsready, wsmes, wssend] = useContext(WebsocketContext);
  
  const currentTime = (date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  };

  const [name, setName] = useState('<Your Name>');
  const [messages, setMessages] = useState([ {
    id: 1,
    sender: 'AdminBot',
    time: currentTime(new Date()),
    text: `Hello ${name} and welcome to the best chat ever!`
  } ]);
  const [currentMessage, setCurrentMessage] = useState('');
  

  const handleInputChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInputClick = (event) => {
    event.target.value = '';
  };

  const handleSendMessage = () => {
    if (currentMessage !== '') {
      const date = new Date();
      const newMessage = {
        id: date.getTime(),
        sender: name,
        time: currentTime(date),
        text: currentMessage
      };

      //setMessages([...messages, newMessage]);
      setCurrentMessage('');
      wssend(JSON.stringify(newMessage));
      
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (wsready) {
      //wssend("test message");
    }
  }, [wsready, wssend]);

  useEffect(() => {
    
    try {
      if ( wsmes != null ) {
        const newMessage = JSON.parse(wsmes)
        if ( !('id' in newMessage) ) {
          newMessage.id = new Date().getTime();
          newMessage.sender = 'Anonymous';
          newMessage.time = '';
          newMessage.text = wsmes;
        }      
        setMessages([...messages, newMessage]);
      }

    } catch (error) {
      if ( wsmes != null ) {
        const newMessage = {
          id: new Date().getTime(),
          sender: 'Anonymous',
          time: '',
          text: wsmes
        }
        setMessages([...messages, newMessage]);
      }
    }

  }, [wsmes]);

  return (
    <div className="chat-app">
      <h1>Chat App</h1>
      <div className="chat-window">
      {wsready ? (
        <p>Connection ready!</p>
      ) : (
        <p>Waiting for connection!</p>
      )}
        {messages.map((message) => (
          <Message key={message.id} sender={message.sender} time={message.time} text={message.text} />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onClick={handleInputClick}
        />
        <input
          type="text"
          value={currentMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;