#! /bin/bash
set -e

# Install cert-bot
sudo apt-get install python-certbot-nginx -y

# Can't do this step until we're running under the domain for real.
# sudo certbot --nginx -d patternjournal.app --non-interactive --agree-tos -m clint@ctro.net
