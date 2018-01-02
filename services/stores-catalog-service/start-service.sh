#!/usr/bin/env bash

docker service create --replicas 1 --name stores-catalog-service -l=apiRoute='/albums' -p 3001:3000 --env-file env davidoregan/stores-catalog-service