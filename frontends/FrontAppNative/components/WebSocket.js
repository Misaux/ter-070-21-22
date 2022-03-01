import socketIOClient  from 'socket.io-client';
import React, { useState, useEffect } from "react";
import DynamicComponent from "./DynamicComponent";
import  {Node} from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

const createComponent = (data) => {
  var props = {htmlContent: data.html,key: data.id}
  return React.createElement(DynamicComponent,props);
}

const WebSocket = () => {
    const [components, setComponents] = useState([]);


  useEffect(() => {
    const socket = socketIOClient(`http://localhost:3010`);
    socket.on("render", data => {
        setComponents(c => c.concat([createComponent(data)]));
        console.log(data);
      });
      socket.emit("refresh",null);
      return () => socket.disconnect();

    }, []);

  return <ScrollView contentContainerStyle={{flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'}} >
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