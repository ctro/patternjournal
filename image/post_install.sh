#! /bin/bash
set -e

# This does not run during Packer build. 
# TODO: automate running this after launch.

# Create the production database as the postgres user
sudo -H -u postgres bash -c 'createdb pj_production' 

# Is this required???  npm install
# npm install /pattertnjournal/package.json

# Migrate Database
NODE_ENV=production /patternjournal/node_modules/.bin/sequelize-cli db:migrate

# Start the server
pm2 start /patternjournal/pm2Config.json

# Set server to restart
pm2 startup
pm2 save

# Certbot SSL has to happen after we're running under the domain for real
sudo certbot --nginx -d patternjournal.app --non-interactive --agree-tos -m clint@ctro.net


