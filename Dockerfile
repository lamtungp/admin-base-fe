FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
COPY . .

RUN apk update && apk add bash
RUN yarn --frozen-lockfile --ignore-optional && yarn cache clean

EXPOSE 3000

CMD [ "yarn", "dev" ]