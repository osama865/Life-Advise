FROM node:14.17.5-alpine
LABEL maintainer="Osama"
LABEL meteor.version="2.5.3"

COPY ./build/bundle /bundle
RUN (cd /bundle/programs/server && npm i)

USER node

CMD node /bundle/main.js