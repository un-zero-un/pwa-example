FROM node:10-alpine

RUN mkdir -p /app/app

WORKDIR /app/app

RUN yarn global add @api-platform/client-generator

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD yarn start
