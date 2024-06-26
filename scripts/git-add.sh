#!/usr/bin/env bash

usage() {
  echo "Usage: git-add.sh <file>"
  exit 1
}

if [ $# -ne 1 ]; then
  usage
fi

FILE="$1"

# Read file content and create a blob object
CONTENT=$(cat "$FILE")
CONTENT_LENGTH=${#CONTENT}
OBJECT_TYPE="blob"
OBJECT_ID=$(echo -n "$OBJECT_TYPE $CONTENT_LENGTH\0$CONTENT" | sha1sum | awk '{print $1}')

# Database connection details
DB_NAME="your_database"
DB_USER="your_user"
DB_HOST="your_host"
DB_PORT="your_port"
DB_PASSWORD="your_password"

# Insert the blob object into the database
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME <<EOF
INSERT INTO git_objects (object_id, type, content) VALUES ('$OBJECT_ID', '$OBJECT_TYPE', '\\x$(echo -n "$OBJECT_TYPE $CONTENT_LENGTH\0$CONTENT" | xxd -p -c $CONTENT_LENGTH)');
EOF

echo "Added file to database with object ID: $OBJECT_ID"
