import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Chat from './components/chat/Chat';
import WebsocketProvider from './components/socket/WebsocketProvider';

function App() {

  return (
    <WebsocketProvider>
      <header>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React + Spring Boot + AWS</h1>
      </header>
      <Chat/>
    </WebsocketProvider>
  )
}

export default App
