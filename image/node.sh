#! /bin/bash

# exit immediately on error
set -e

# Node install instructions from https://github.com/nodesource/distributions/blob/master/README.md
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v

# Install Pm2 globally
sudo npm install pm2 -g
