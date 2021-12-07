import socketIOClient  from 'socket.io-client';
import React, { useState, useEffect } from "react";
import DynamicComponent from "./DynamicComponent";
function createComponent(data) {
  var props = {htmlContent: data.html,key: data.id}
  return React.createElement(DynamicComponent,props);
}

function WebSocket() {
    const [components, setComponents] = useState([]);


  useEffect(() => {
    const socket = socketIOClient(`http://${window.location.hostname}:3010`);
    socket.on("render", data => {
        setComponents(c => c.concat([createComponent(data)]));
        console.log(data);
      });
      return () => socket.disconnect();

    }, []);

  return <div>{components}</div>
}

export default WebSocket;