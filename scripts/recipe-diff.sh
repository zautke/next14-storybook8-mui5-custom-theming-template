#!/usr/bin/env bash

# Usage: recipe-db-diff.sh OLD_ID NEW_ID
OLD_ID="$1"
NEW_ID="$2"

# Database connection details
DB_NAME="your_database"
DB_USER="your_user"
DB_HOST="your_host"
DB_PORT="your_port"
DB_PASSWORD="your_password"

# Fetch the JSON objects from the database
OLD_JSON=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT recipe_json FROM recipes WHERE id = '$OLD_ID';")
NEW_JSON=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT recipe_json FROM recipes WHERE id = '$NEW_ID';")

# Format the JSON objects using jq
OLD_JSON_FORMATTED=$(echo "$OLD_JSON" | jq -S .)
NEW_JSON_FORMATTED=$(echo "$NEW_JSON" | jq -S .)

# Compare the JSON objects using diff
diff -u <(echo "$OLD_JSON_FORMATTED") <(echo "$NEW_JSON_FORMATTED")
