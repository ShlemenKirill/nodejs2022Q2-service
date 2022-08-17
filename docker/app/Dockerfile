#FROM node:16-alpine AS BUILD_IMAGE
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
## install dependencies
#RUN npm install
#
#COPY . .
#
#FROM node:16-alpine
#
#WORKDIR /usr/src/app
#
#COPY .env.example .env
#EXPOSE ${PORT}
#
#CMD [ "npm", "run", "start:dev" ]
#

FROM node:16-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && mv node_modules ../
COPY prisma ./prisma/
RUN npm install
COPY . .
COPY .env.example .env
EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]
