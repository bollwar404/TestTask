#!/bin/bash

docker run -d --name postgres -v my_dbdata:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

PGPASSWORD=password docker exec -it postgres psql -U postgres -c "create database testTask"

GPASSWORD=password docker exec -it postgres psql -U postgres -c "
CREATE TABLE accounts
(
account_id bigserial PRIMARY KEY,
balance decimal(12, 0) CHECK ( balance > 0 )
);"

node index.js --port=3001

