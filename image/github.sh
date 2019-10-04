#! /bin/bash

set -e

# Google creates a `clint` account for me when I ssh in via the web.
# Just make sure that account exists.
sudo useradd -m -s /bin/bash clint

# Git / Github
sudo apt-get -y install git

# SSH keys are set at build time by packer, make sure they exist for `clint` too
sudo cp -R /home/packer/.ssh /home/clint
sudo chown -R clint /home/clint/.ssh

# Have clint change his own config
sudo -H -u clint bash -c 'echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> /home/clint/.ssh/config' 

# Clone the repo as `clint` cause that's who you'll be later.
sudo mkdir /patternjournal
sudo chown -R clint /patternjournal
sudo -H -u clint bash -c 'git clone git@github.com:ctro/patternjournal /patternjournal' 

# We just cloned the app.  Some files need exec permissions... may as well do it here :)
sudo -H -u clint bash -c 'chmod +x /patternjournal/image/bootstrap.sh'
sudo -H -u clint bash -c 'chmod +x /patternjournal/image/backup_db.sh'
sudo -H -u clint bash -c 'chmod +x /patternjournal/image/restore_db.sh'

