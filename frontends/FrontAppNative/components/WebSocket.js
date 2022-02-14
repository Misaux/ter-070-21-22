import socketIOClient  from 'socket.io-client';
import React, { useState, useEffect } from "react";
import DynamicComponent from "./DynamicComponent";
import type {Node} from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

const createComponent = (data) => {
  var props = {htmlContent: data.html,key: data.id}
  return React.createElement(DynamicComponent,props);
}

const WebSocket: () => Node = () => {
    const [components, setComponents] = useState([]);


  useEffect(() => {
    const socket = socketIOClient(`http://localhost:3010`);
    socket.on("render", data => {
        setComponents(c => c.concat([createComponent(data)]));
        console.log(data);
      });
      return () => socket.disconnect();

    }, []);

  return <ScrollView >
  {components}
  </ScrollView>
}

var styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
export default WebSocket;