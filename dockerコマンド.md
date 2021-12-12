docker-compose down
docker-compose build --no-cache
docker-compose up -d

docker exec -it health-server /bin/bash
nodemon index.ts

node index.js
