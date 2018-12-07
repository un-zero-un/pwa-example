#!/bin/sh
set -e

if [ "$1" = '' ]; then
    echo "No argument… Guessing env ${APP_ENV}"

    if [ "${APP_ENV}" != 'prod' ]; then
        echo "Launching dev build"
        yarn
        yarn run start-ssr &
        yarn run start &
        nodemon server.js
    else
        echo "Serving prod build"
        node server.js
    fi
else
    exec $@
fi
