FROM node:19-alpine

RUN apk update
RUN apk upgrade
RUN apk add bash tree

COPY ./entrypoint.sh /entrypoint.sh
USER node
WORKDIR /app
ENTRYPOINT [ "bash","/entrypoint.sh" ]