#! /bin/bash

set -e

# Git / Github
sudo apt-get -y install git
ssh-keygen -t rsa -b 4096 -C "clint@ctro.net" -f ~/.ssh/id_rsa -N ''
echo "Here comes the public key... add it to github/deploy_keys now."
echo "I'll wait 60 SECONDS"
cat ~/.ssh/id_rsa.pub

sleep 60

echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

# This is at /home/packer/patternjournal
git clone git@github.com:ctro/patternjournal
