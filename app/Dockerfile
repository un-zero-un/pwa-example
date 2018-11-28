FROM node:10-alpine

RUN mkdir -p /app/app

WORKDIR /app/app

RUN yarn global add @api-platform/client-generator serve

COPY package.json yarn.lock ./
RUN yarn install

COPY src src/
COPY public public/
COPY tsconfig.json ./
COPY .babelrc ./
COPY .env ./

RUN source .env; \
    yarn build

COPY server.js ./

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod a+x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
