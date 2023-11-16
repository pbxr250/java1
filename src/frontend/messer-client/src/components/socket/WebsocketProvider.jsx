import React, { createContext, useEffect, useRef, useState } from 'react';

export const WebsocketContext = createContext([false, null, () => {}]);

const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    const isProduction = import.meta.env.PROD;
    const websocketUrl = isProduction
        ? 'ws://' + window.location.host + '/chat'
        //? import.meta.env.VITE_WEBSOCKET_URL_PROD
        : 'ws://' + window.location.host + '/chat';
        //: import.meta.env.VITE_WEBSOCKET_URL_DEV;
    const socket = new WebSocket(websocketUrl);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (event) => setVal(event.data);
    socket.onerror = (error) => console.log('Error in connecting to socket' + error)

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const ret = [isReady, val, ws.current?.send.bind(ws.current)];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
}

export default WebsocketProvider