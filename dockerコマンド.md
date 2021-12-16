docker-compose down
docker-compose build --no-cache
docker-compose up -d

docker network create health-networks

docker exec -it health-server /bin/sh
docker exec -it health-server /bin/bash

apt update
apt -y upgrade
apt -y install postgresql

psql -h health-db -U health -d healthes

# PSQL install

apt update
apt -y install sudo
sudo apt -y install lsb-release

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt -y install postgresql
