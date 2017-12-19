#!/usr/bin/env bash

docker rm -f albums-service

docker rmi albums-service

docker image prune

docker volume prune

docker build -t albums-service .