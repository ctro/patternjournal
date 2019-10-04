#! /bin/bash
set -e

# This does not run during Packer build. 
# TODO: automate running this after launch.

# Create the production database as the postgres user
sudo -H -u postgres bash -c 'createdb pj_production' 

# Do an initial npm install as clint
cd /patternjournal
sudo -H -u clint bash -c 'npm install' 

# Migrate Database as clint
sudo -H -u clint bash -c 'NODE_ENV=production ./node_modules/.bin/sequelize-cli db:migrate' 

# Start the server
pm2 start ./pm2Config.json

# Set server to restart
pm2 startup
pm2 save

# Certbot SSL has to happen after we're running under the domain for real
sudo certbot --nginx -d patternjournal.app --non-interactive --agree-tos -m clint@ctro.net


