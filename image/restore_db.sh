#! /bin/bash
set -e

# Run this file to restore a DB From GCP Storage

# Specify the backup to restore here. Pick one from the browser:
#  https://console.cloud.google.com/storage/browser/patternjournal-production-backups?project=pattern-journal-1568127981392
BACKUP="CHANGEME"

sudo gsutil cp gs://patternjournal-production-backups/$BACKUP .
sudo chown postgres $BACKUP 

sudo -H -u postgres bash -c "dropdb pj_production" 
sudo -H -u postgres bash -c "createdb pj_production" 
sudo -H -u postgres bash -c "psql pj_production < $BACKUP" 
