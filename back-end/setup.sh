#!/bin/sh
# Creates the database and imports tables and connector account
mariadb -V && MYSQL='mariadb' || MYSQL='mysql'
BACKEND_DIR="$(dirname "$0")"
$MYSQL -u 'root' -e 'CREATE DATABASE IF NOT EXISTS sec_site;'
$MYSQL -u 'root' 'sec_site' < "${BACKEND_DIR}/sec_site.sql"
$MYSQL -u 'root' 'sec_site' < "${BACKEND_DIR}/connector.sql"
