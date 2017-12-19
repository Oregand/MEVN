#!/usr/bin/env bash

docker service create --replicas 1 --name albums-service -l=apiRoute='/albums' -p 3000:3000 davidoregan/albums-service