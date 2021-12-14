docker-compose down
docker-compose build --no-cache
docker-compose up -d

docker network create health-networks

docker exec -it health-server /bin/sh
docker exec -it health-server /bin/bash

apt update
apt -y upgrade
apt -y postgresql

psql -h health-db -U health -d healthes
