#!/bin/bash
USER="root"
PASSWORD="123456"
DATABASE="test_residencia"

FINAL_OUTPUT=backups/`date +%Y%m%d`_$DATABASE.sql
mysqldump --user=$USER --password=$PASSWORD $DATABASE > $FINAL_OUTPUT
gzip $FINAL_OUTPUT

#! crontab -e
#! 00 11 * * * /Users/fblanco/Documents/projects-dev/dev-seguimiento-residencias/backups/backup.sh
#! crontab -l