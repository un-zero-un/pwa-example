build: app/.env api/.env
	docker-compose build

run: app/.env api/.env
	docker-compose up -d
	./exec-in-api.sh composer install
	make reset


run_prod:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --force-recreate

reset:
	./exec-in-api.sh composer reset

app/.env: app/.env.dist
	cp app/.env.dist app/.env

api/.env: api/.env.dist
	cp api/.env.dist api/.env
