#!/bin/sh
set -e



if [ "${APP_ENV}" != 'prod' ]; then
    cp /root/default.nginx.conf /etc/nginx/conf.d/
else
    cp /root/prod.nginx.conf /etc/nginx/conf.d/
fi

exec "$@"
