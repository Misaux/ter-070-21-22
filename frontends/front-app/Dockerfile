#Pull light alpine image
FROM node:14-alpine

#Defines our working directory and copy our defined dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

#Install our dependencies
RUN npm install --silent --no-progress --no-audit --no-optional --no-fund
#Install an additional dependency for deployment purpose (Cf: Deploygment guide for a React App)
RUN npm install -g serve

#Copy full content
COPY . .

#Build the production app
RUN npm run build

#Start the app in Dev Mode ! To change for production
#CMD ["npm", "start"]

#Start the app in Production mode
CMD ["serve", "-s", "build"]