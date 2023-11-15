#!/bin/sh
# Deletes the database and connector account if the database is not in use.
if sudo mysqladmin processlist | grep -q 'sec_site'
#if mysql -u root -e 'SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST WHERE DB = "sec_site";'
then
    printf 'A user is currently connected to the sec_site database'
else
    sudo mysql -u 'root' -e 'DROP DATABASE IF EXISTS sec_site;'
    sudo mysql -u 'root' -e 'DROP USER IF EXISTS sec_connector@localhost;'
fi

