FROM node:12-slim

WORKDIR /usr/src/app

COPY scripts .

COPY package.json .
COPY package-lock.json .

RUN npm install
CMD ./scripts/wait_for_it.sh mongodb:27017 --strict --timeout=300 && npm run initialize-db
