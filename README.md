# Docker
docker build -t docker-node .
docker run -p 3000:4000 -d --name nodejs-container docker-node