#!/bin/bash
cd services/readers-interface
npm install
npm run build
cd ../../frontends/front-app
npm install
cd ../../
