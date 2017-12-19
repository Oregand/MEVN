#!/usr/bin/env bash

docker service create --replicas 1 --name albums-catalog-service -l=apiRoute='/albums' -p 3001:3000 --env-file env davidoregan/albums-catalog-service