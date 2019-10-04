#! /bin/bash

# exit immediately on error
set -e

sudo apt-get -y install postgresql postgresql-contrib libpq-dev

# Edit in-place. change md5 to trust
sudo sed -i 's/local   all             all                                     md5/local   all             all                                     trust/' /etc/postgresql/11/main/pg_hba.conf
sudo sed -i 's/host    all             all             127.0.0.1\/32            md5/host    all             all             127.0.0.1\/32            trust/' /etc/postgresql/11/main/pg_hba.conf

sudo chown postgres /etc/postgresql/11/main/pg_hba.conf
