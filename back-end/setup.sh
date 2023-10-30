#!/bin/sh
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS sec_site;'
mysql -u root sec_site < sec_site.sql
mysql -u root sec_site < connector.sql
