FROM node:10-alpine

ARG REACT_APP_API_ENTRYPOINT


RUN mkdir -p /app/app

WORKDIR /app/app

RUN set -eux; \
    yarn global add @api-platform/client-generator serve nodemon; \
    mkdir -p build

COPY package.json yarn.lock ./
RUN yarn install

COPY webpack.config.js ./
COPY webpack.ssr.js ./
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
