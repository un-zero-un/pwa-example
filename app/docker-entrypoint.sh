#!/bin/sh
set -e

if [ "$1" = '' ]; then
    echo "No argument… Guessing env ${APP_ENV}"

    if [ "${APP_ENV}" != 'prod' ]; then
        echo "Launching dev build"
        yarn
        if [ 'true' == "${SSR_ENABLED}" ]; then
            yarn run start-ssr &
        fi
        yarn run start &
        nodemon server.js
    else
        echo "Serving prod build"
        node server.js
    fi
else
    exec $@
fi
