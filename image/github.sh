#! /bin/bash

set -e

# Git / Github
sudo apt-get -y install git
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

# This is at /home/packer/patternjournal
# SSH keys are set at build time by packer
git clone git@github.com:ctro/patternjournal

# Move to final home at /patternjournal and delete the other source.
sudo mv /home/packer/patternjournal /
sudo chown -R root.root /patternjournal

