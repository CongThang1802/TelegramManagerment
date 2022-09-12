#!/usr/bin/sh
# Write docker compose file

rm ./docker-compose.yml
touch ./docker-compose.yml

echo $pwd

ENV_PATH=../../.env

POSTGRES_USERNAME=$(cat $ENV_PATH | grep DB_USERNAME | sed "s/DB_USERNAME=//")
POSTGRES_PASSWORD=$(cat $ENV_PATH | grep DB_PASSWORD | sed "s/DB_PASSWORD=//")
POSTGRES_PORT=$(cat $ENV_PATH | grep DB_PORT | sed "s/DB_PORT=//")
POSTGRES_DB=$(cat $ENV_PATH | grep DB_NAME | sed "s/DB_NAME=//")

echo "version: '3.9'
services:
  postgresql:
    image: postgres:14.4
    container_name: postgresql
    ports:
      - ${POSTGRES_PORT}:5432
    environment:
      - POSTGRES_USER=$POSTGRES_USERNAME
      - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
      - POSTGRES_DB=$POSTGRES_DB
      - PGDATA=/var/lib/postgresql/data/pgdata
    volumes:
      - ./postgres-data:/var/lib/postgresql/data 
    restart: always " >docker-compose.yml
