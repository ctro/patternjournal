#! /bin/bash

set -e

# Google creates a `clint` account for me when I ssh in via the web.
# Just make sure that account exists.
sudo useradd -m -s /bin/bash clint

# Git / Github
apt-get -y install git

# Have clint change his own config
sudo -H -u clint bash -c 'echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> /home/clint/.ssh/config' 

# SSH keys are set at build time by packer, make sure they exist for `clint` too
sudo cp -R /home/packer/.ssh /home/clint
sudo chown -R clint /home/clint/.ssh

# Clone the repo as `clint` cause that's who you'll be later.
sudo mkdir /patternjournal
sudo chown -R clint /patternjournal
sudo -H -u clint bash -c 'git clone git@github.com:ctro/patternjournal /patternjournal' 

