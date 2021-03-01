FROM node:12-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

CMD npm install
# CMD npm run start:server