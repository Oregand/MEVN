#!/usr/bin/env bash

docker rm -f stores-catalog-service

docker rmi stores-catalog-service

docker image prune

docker volume prune

docker build -t stores-catalog-service .