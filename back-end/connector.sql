-- Script for importing the sec_connector user and its privileges.

DROP USER IF EXISTS sec_connector@localhost;

-- Unhashed password is 'password'
CREATE USER IF NOT EXISTS sec_connector@localhost
    IDENTIFIED BY PASSWORD '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19';

GRANT SELECT, INSERT, UPDATE, DELETE
    ON sec_site.site_users
    TO sec_connector@localhost;

GRANT SELECT
    ON sec_site.user_roles
    TO sec_connector@localhost;

