#!/bin/sh
printf "Starting Docker container in $NODE_ENV...\n"
printf "Waiting for MySQL DB to come up...\n";
until node ./provisioning/wait-for-mysql.js
do
  sleep 1;
done
if [ -n "$DB_RESET" ]; then
  printf "\n* Rolling back Database Migrations *\n"
  ./node_modules/.bin/knex migrate:rollback
fi
if [ -n "$DB_MIGRATE" ]; then
  printf "\n* Running Database Migrations *\n"
  ./node_modules/.bin/knex migrate:latest
fi
if [ -n "$DB_SEED" ]; then
  printf "\n* Seeding Database *\n"
  ./node_modules/.bin/knex seed:run
fi
printf "\n* Starting Application *\n\n"
npm run $NODE_ENV;

# Alter pg_hba.conf to actually require passwords.  The default image exposes
# allows any user to connect without requiring a password, which is a liability
# if this is run forwarding ports from the host machine.
# sed -ri -e 's/(host all all 0.0.0.0\/0 )(trust)/\1md5/' "$PGDATA"/pg_hba.conf
