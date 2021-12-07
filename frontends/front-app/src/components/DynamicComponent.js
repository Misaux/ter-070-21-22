import React, { useState } from "react";

function DynamicComponent({htmlContent: initialHtmlContent}) {
    const htmlContent = useState(initialHtmlContent);
    console.log(htmlContent);
    console.log(initialHtmlContent);

  return (<div dangerouslySetInnerHTML={{__html: htmlContent[0]}} />);
}

export default DynamicComponent;
