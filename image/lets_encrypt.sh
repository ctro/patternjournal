#! /bin/bash
set -e

# Install cert-bot
sudo apt-get install python-certbot-nginx -y

sudo certbot --nginx -d patternjournal.app --non-interactive --agree-tos -m clint@ctro.net
