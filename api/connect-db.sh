#!/usr/bin/env sh

CONNECT_STRING=$(echo ${DATABASE_URL} | awk -F '//' '{print $2}' -)

CREDENTIALS=$(echo ${CONNECT_STRING} | awk -F '@' '{print $1}' -)
HOST_INFO=$(echo ${CONNECT_STRING} | awk -F '@' '{print $2}' -)

LOGIN=$(echo ${CREDENTIALS} | awk -F ':' '{print $1}' -)
PASSWORD=$(echo ${CREDENTIALS} | awk -F ':' '{print $2}' -)

HOST_AND_PORT=$(echo ${HOST_INFO} | awk -F '/' '{print $1}' -)
DATABASE=$(echo ${HOST_INFO} | awk -F '/' '{print $2}' -)

HOST=$(echo ${HOST_AND_PORT} | awk -F ':' '{print $1}' -)
PORT=$(echo ${HOST_AND_PORT} | awk -F ':' '{print $2}' -)


echo "Connecting to ${HOST}:${PORT} as ${LOGIN} with ${PASSWORD} on database ${DATABASE}"

PGPASSWORD=${PASSWORD} psql -U${LOGIN} -h${HOST} -p${PORT} ${DATABASE} $*
