import React, { useState } from "react";
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'
import {
  StyleSheet,
  ScrollView
} from 'react-native';
const DynamicComponent= ({htmlContent: initialHtmlContent})=>{
    const htmlContent = useState(initialHtmlContent);




      return ( 
        <AutoHeightWebView 
        customStyle={`
      * {
        height: 100%;
      }
    `}    style={{ width: Dimensions.get('window').width - 15, marginTop: 35 }}
        contentContainerStyle={{flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}} 
        originWhitelist={['*']}
        source={{html:htmlContent[0]}} 
        startInLoadingState={true}
        scrollEnabled={true}
        viewportContent={'width=device-width'}

        />
      );
}

export default DynamicComponent;
