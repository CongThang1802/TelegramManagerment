touch ./docker-compose.yml

ENV_PATH=../../.env

MYSQL_USERNAME=$(cat $ENV_PATH | grep DB_USERNAME | sed "s/DB_USERNAME=//")
MYSQL_PASSWORD=$(cat $ENV_PATH | grep DB_PASSWORD | sed "s/DB_PASSWORD=//")
MYSQL_PORT=$(cat $ENV_PATH | grep DB_PORT | sed "s/DB_PORT=//")
MYSQL_DB=$(cat $ENV_PATH | grep DB_NAME | sed "s/DB_NAME=//")

cat <<EOF >./docker-compose.yml
version: '3.9'
services:
  mysql:
    image: mysql:5.7.39
    container_name: mysql
    ports:
      - "${MYSQL_PORT}:3306"
    volumes:
      -  ./mysql-data:/var/lib/mysql
    environment:
      - MYSQL_USER=${MYSQL_USERNAME}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
      - MYSQL_ROOT_PASSWORD=mysql-root-secrete-password
      - MYSQL_DATABASE=${MYSQL_DB}
    restart: always
EOF
