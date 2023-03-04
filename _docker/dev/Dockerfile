# dev stage
FROM node:lts-alpine

COPY resources/startup.sh /usr/local/bin/startup.sh
RUN chmod 777 /usr/local/bin/startup.sh

RUN npm install -g @nestjs/cli

WORKDIR /app

VOLUME ["/app"]

EXPOSE 4000
CMD ["sh", "/usr/local/bin/startup.sh"]
