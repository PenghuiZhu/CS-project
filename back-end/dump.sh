#!/bin/sh
# Run this before commit after changing the live db
mariadb-dump -V && MYSQLDUMP='mariadb-dump' || MYSQLDUMP='mysqldump'
BACKEND_DIR="$(dirname "$0")"
DBDATA="$(sudo $MYSQLDUMP -u 'root' 'sec_site')"
[ "$DBDATA" ] && printf '%s' "$DBDATA" > "${BACKEND_DIR}/sec_site.sql"

