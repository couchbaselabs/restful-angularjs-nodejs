FROM node:6-alpine

COPY . .

RUN npm install

CMD node app.js