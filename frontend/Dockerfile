FROM node:12-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

# CMD ls
# RUN pwd
# CMD cat package.json

RUN npm install
CMD npm run start:app