# Use the official Node.js image as a base
FROM node:19-alpine as build-stage

WORKDIR /app

RUN apk update
RUN apk upgrade
RUN apk add bash

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "bash","/entrypoint.sh" ]