run: app/.env api/.env
	docker-compose up -d
	./exec-in-api.sh composer install
	make reset

reset:
	./exec-in-api.sh composer reset

app/.env: app/.env.dist
	cp app/.env.dist app/.env

api/.env: api/.env.dist
	cp app/.env.dist app/.env
