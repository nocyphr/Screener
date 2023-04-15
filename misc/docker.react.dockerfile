FROM node:19-alpine
WORKDIR /app

RUN apk update
RUN apk upgrade
RUN apk add bash

USER node
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "bash","/entrypoint.sh" ]