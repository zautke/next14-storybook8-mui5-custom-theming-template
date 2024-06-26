#!/usr/bin/env bash

usage() {
  echo "Usage: git-diff.sh <commit_A> <commit_B>"
  exit 1
}

if [ $# -ne 2 ]; then
  usage
fi

COMMIT_A="$1"
COMMIT_B="$2"

# Database connection details
DB_NAME="your_database"
DB_USER="your_user"
DB_HOST="your_host"
DB_PORT="your_port"
DB_PASSWORD="your_password"

# Retrieve the blob content for both commits
CONTENT_A=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT content FROM git_objects WHERE object_id='$COMMIT_A';")
CONTENT_B=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT content FROM git_objects WHERE object_id='$COMMIT_B';")

# Use jq to format and diff JSON objects
echo "$CONTENT_A" | jq -S . >/tmp/content_a.json
echo "$CONTENT_B" | jq -S . >/tmp/content_b.json

diff -u /tmp/content_a.json /tmp/content_b.json

# Cleanup
rm /tmp/content_a.json /tmp/content_b.json
