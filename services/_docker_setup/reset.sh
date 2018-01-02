#!/usr/bin/env bash

eval `docker-machine env manager1`

docker service rm albums-service stores-catalog-service

for server in manager1 worker1 worker2
do
  eval `docker-machine env $server`

  for image in david/albums-service david/stores-catalog-service
    do
      IMAGE=$(docker images $image -q)
      docker rmi -f $IMAGE
  done
done