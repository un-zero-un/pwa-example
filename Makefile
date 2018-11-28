run:
	docker-compose up -d
	make reset

reset:
	./exec-in-api.sh composer reset
