# build
FROM node:18 as build

LABEL maintainer="bmswens@gmail.com"
EXPOSE 3000

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./src ./src
COPY ./bin ./bin

ENTRYPOINT ["npm", "start"]