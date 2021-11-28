# Example Micro-Frontend

## Requirements

- Install the dependencies :

```bash
npm install
```

## Development

- To run the React App (Dev mode only) :

```bash
npm run start
```

## Production

- To build the React App :

```bash
npm run build
```

- To run the React App :

```bash
npm install -g serve
serve -s build
```

## Transform react app in single-spa

Delete in package.json all the scripts and this dependencies:
"@testing-library/jest-dom": "^5.15.1",
"@testing-library/react": "^11.2.7",
"@testing-library/user-event": "^12.8.3",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-scripts": "4.0.3",

```bash

## if create-single-spa isn't installed
npm install --global create-single-spa

npm create single-spa

```

Overwrite package.json and .gitignore(tap y)

After that,
delete public directory and the file src/index.js. 
If you want, import your index.css in the new ${orgnisation-name}-${project-name}.js

Delete root.components.js and import App.js in ${orgnisation-name}-${project-name}.js:

```js
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App.js";
import './index.css'
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```
Link for help:
https://www.youtube.com/watch?v=W8oaySHuj3Y