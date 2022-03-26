FROM node:16.13.2

WORKDIR /messenger

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD node server.js
