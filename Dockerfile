FROM node:16.14.2-alpine as base

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

ENV NODE_OPTIONS=--max-old-space-size=4096

RUN node --max-old-space-size=40096

COPY --chown=node:node . .

RUN npm install -g typescript

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
