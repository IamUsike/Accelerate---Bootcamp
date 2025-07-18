#!/bin/bash

docker rm -f dom-xss-todo
docker build -t dom-xss-todo .
docker run -p 3000:80 --name dom-xss-todo dom-xss-todo
