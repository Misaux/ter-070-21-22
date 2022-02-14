import React, { useState } from "react";
import {WebView} from 'react-native-webview';
import {
  View
} from 'react-native';
import type {Node} from 'react';

const DynamicComponent= ({htmlContent: initialHtmlContent}): Node =>{
    const htmlContent = useState(initialHtmlContent);
    console.log(htmlContent);
    console.log(initialHtmlContent);

  return ( <View style={{ height: 200 }}>
    <WebView
    originWhitelist={['*']}
    source={{ html: htmlContent[0] }}
  /></View>
  );
}

export default DynamicComponent;
