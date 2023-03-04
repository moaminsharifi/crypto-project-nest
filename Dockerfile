FROM node:lts-alpine AS dev

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

VOLUME ["/app"]

EXPOSE 4000