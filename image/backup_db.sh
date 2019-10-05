#! /bin/bash
set -e

# This script gets moved onto the image, and will be called by cron for DB backups

# Do the backup as postgres user. transform spae to dash.
sudo -H -u postgres bash -c 'pg_dump pj_production > "/tmp/pj_production.backup.$(date | tr [:space:] '-').sql"' 

# Upload the dump to Storage, gsutil is just installed :)
gcloud auth activate-service-account --key-file /patternjournal/image/serviceAdminAccount.json
gsutil cp /tmp/pj_production.backup* gs://patternjournal_postgres_backups

# Cleanup to save local space, and because we're sloppy about uploads
sudo rm -f /tmp/pj_production.backup*

