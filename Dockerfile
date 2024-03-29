FROM node:20.6.0-alpine as base

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --legacy-peer-deps

ENV NODE_OPTIONS=--max-old-space-size=4096

RUN node --max-old-space-size=40096

COPY --chown=node:node . .

RUN npm install -g typescript

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
