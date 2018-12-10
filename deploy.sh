#!/usr/bin/env sh

export $(cat .env | xargs) && \
docker stack deploy -c docker-compose.yaml -c docker-compose.prod.yaml pwa-demo
