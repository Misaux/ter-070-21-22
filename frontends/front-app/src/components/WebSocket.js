import socketIOClient  from 'socket.io-client';
import React, { useState, useEffect } from "react";

function WebSocket() {
    const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(`http://${window.location.hostname}:3010`);
    socket.on("render", data => {
        setResponse(data);
      });
      return () => socket.disconnect();

    }, []);

  return (
    <p>
      It's a message from websocket: {response}
    </p>
  );
}

export default WebSocket;