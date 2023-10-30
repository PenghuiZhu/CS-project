# Backend Database

## Using MySQL 8.1.0

"sec" stands for "Software Engineering Capstone"

After cloning this repo, run `$ npm install` to get necessary node modules.

Also, run `sudo setup.sh` to initialize the database and user.
(If you're on Windows, you're on your own.)

Then, you can test run the js file with
`node db.js`

To export the database for commit after editing, use
`$ sudo mysqldump -u root sec_site > sec_site.sql`

