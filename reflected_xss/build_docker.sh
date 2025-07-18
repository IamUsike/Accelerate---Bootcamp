#!/bin/bash
docker rm -f reflected-xss-todo
docker build -t reflected-xss-todo .
docker run -p 3000:3000 --name reflected-xss-todo reflected-xss-todo
