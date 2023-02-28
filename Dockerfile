FROM node:19-alpine3.15 AS dev

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

VOLUME ["/app"]

EXPOSE 4000
