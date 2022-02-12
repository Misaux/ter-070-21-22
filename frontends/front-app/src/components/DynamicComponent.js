import React, { useState } from "react";

function DynamicComponent({htmlContent: initialHtmlContent}) {
    const htmlContent = useState(initialHtmlContent);
    console.log(htmlContent)

  return (<div style={{width: '100%', height: '100%'}} dangerouslySetInnerHTML={{__html: htmlContent[0]}} />);
}

export default DynamicComponent;
