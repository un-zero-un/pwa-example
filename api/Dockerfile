ARG PHP_VERSION=7.3.0RC6
ARG NGINX_VERSION=1.15
ARG ALPINE_VERSION=3.8
ARG VARNISH_VERSION=6.0

FROM php:${PHP_VERSION}-fpm-alpine${ALPINE_VERSION} AS api_php

ARG APCU_VERSION=5.1.14

RUN set -eux; \
    apk add --no-cache postgresql-client libpq libstdc++ make git icu acl libzip; \
    apk add --no-cache --virtual .build-deps ${PHPIZE_DEPS} icu-dev postgresql-dev zlib-dev libzip-dev; \
    docker-php-ext-install zip pdo_pgsql intl pcntl mbstring opcache; \
    pecl install apcu-${APCU_VERSION}; \
    docker-php-ext-enable apcu; \
    apk del .build-deps

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN ln -s $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini
COPY app.php.ini $PHP_INI_DIR/conf.d/

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN set -eux; \
    composer global require "hirak/prestissimo:^0.3" --prefer-dist --no-progress --no-suggest --classmap-authoritative; \
    composer clear-cache

ENV PATH="${PATH}:/root/.composer/vendor/bin"

WORKDIR /app/api

ARG APP_ENV=prod
COPY composer.json composer.lock symfony.lock ./
RUN set -eux; \
    composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; \
    composer clear-cache

COPY bin bin/
COPY config config/
COPY public public/
COPY src src/

RUN set -eux; \
    mkdir -p var/cache var/log; \
    composer dump-autoload --classmap-authoritative --no-dev; \
    composer run-script --no-dev post-install-cmd; \
    chmod +x bin/console; sync

VOLUME /app/api/var

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]







FROM nginx:${NGINX_VERSION}-alpine AS api_nginx

COPY default.nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app/api

COPY --from=api_php /app/api/public public/
