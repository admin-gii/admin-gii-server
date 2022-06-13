STACK=admin_generator

ifneq (,$(wildcard ./.env))
    include .env
    export
endif


build:
	docker compose up --build -d app

down:
	docker compose down -v

logs:
	docker logs --follow admin-generator-server

bash:
	docker exec -it admin-generator-server sh

psql:
	docker exec -it admin-generator-db psql -U ${DB_USER} -d ${DB_NAME}










