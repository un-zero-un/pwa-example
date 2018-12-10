#!/bin/sh
set -e

if [ "$1" = '' ]; then
    echo "No argument… Guessing env ${APP_ENV}"

    if [ "${APP_ENV}" != 'prod' ]; then
        echo "Launching dev build"
        yarn
        yarn run start &
        if [ 'true' == "${SSR_ENABLED}" ]; then
            yarn run start-ssr &
            nodemon --config nodemon.json --watch views --watch server.js --watch build/manifest.json server.js &
        fi
        node server.js
    else
        echo "Serving prod build"
        node server.js
    fi
else
    exec $@
fi
