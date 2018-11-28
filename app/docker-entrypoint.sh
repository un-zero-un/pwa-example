#!/bin/sh
set -e

if [ "$1" = '' ]; then
    echo "No argument… Guessing env ${APP_ENV}"

    if [ "${APP_ENV}" != 'prod' ]; then
        echo "Launching dev build"
        yarn run start
    else
        echo "Serving prod build"
        serve -s build -p 3000
    fi
else
    exec $@
fi
