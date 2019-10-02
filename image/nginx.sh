#! /bin/bash
set -e

sudo apt-get install nginx -y
# test it
curl localhost
