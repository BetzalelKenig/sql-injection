FROM node:14

# RUN apk add git

WORKDIR /usr/src/app

RUN npm i -g typescript

RUN npm i -g nodemon

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

RUN npm run build

EXPOSE 3322

CMD [ "node", "dist/index.js" ]