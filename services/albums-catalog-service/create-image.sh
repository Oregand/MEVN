#!/usr/bin/env bash

docker rm -f albums-catalog-service

docker rmi albums-catalog-service

docker image prune

docker volume prune

docker build -t albums-catalog-service .