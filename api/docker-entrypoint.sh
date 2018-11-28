#!/bin/sh
set -e


CONNECT_STRING=$(echo ${DATABASE_URL} | awk -F '//' '{print $2}' -)

CREDENTIALS=$(echo ${CONNECT_STRING} | awk -F '@' '{print $1}' -)
HOST_INFO=$(echo ${CONNECT_STRING} | awk -F '@' '{print $2}' -)

LOGIN=$(echo ${CREDENTIALS} | awk -F ':' '{print $1}' -)
PASSWORD=$(echo ${CREDENTIALS} | awk -F ':' '{print $2}' -)

HOST_AND_PORT=$(echo ${HOST_INFO} | awk -F '/' '{print $1}' -)
DATABASE=$(echo ${HOST_INFO} | awk -F '/' '{print $2}' -)

HOST=$(echo ${HOST_AND_PORT} | awk -F ':' '{print $1}' -)
PORT=$(echo ${HOST_AND_PORT} | awk -F ':' '{print $2}' -)




# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
    set -- php-fpm "$@"
fi

if [ "$1" = 'php-fpm' ] || [ "$1" = 'php' ] || [ "$1" = 'bin/console' ]; then
    mkdir -p var/cache var/log
    setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX var
    setfacl -dR -m u:www-data:rwX -m u:"$(whoami)":rwX var

    if [ "$APP_ENV" != 'prod' ]; then
        ln -sf ${PHP_INI_DIR}/php.ini-development ${PHP_INI_DIR}/php.ini
        composer install --prefer-dist --no-progress --no-suggest --no-interaction
    else
        ln -sf ${PHP_INI_DIR}/php.ini-production ${PHP_INI_DIR}/php.ini
    fi

    >&2 echo "Waiting for Postgres to be ready..."
    until pg_isready --timeout=0 --dbname="${DATABASE}" --username="${LOGIN}" --host="${HOST}" --port="${PORT}"; do
        sleep 1
    done
fi

exec docker-php-entrypoint "$@"
