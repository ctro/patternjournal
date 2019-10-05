#! /bin/bash
set -e

# This script is meant to be run while on the remote server

cd /patternjournal
git pull
npm install
NODE_ENV=production npm run migrate
pm2 restart all
