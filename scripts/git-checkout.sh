#!/usr/bin/env bash

usage() {
  echo "Usage: git-checkout.sh <branch_name>"
  exit 1
}

if [ $# -ne 1 ]; then
  usage
fi

BRANCH_NAME="$1"

# Database connection details
DB_NAME="your_database"
DB_USER="your_user"
DB_HOST="your_host"
DB_PORT="your_port"
DB_PASSWORD="your_password"

# Get the latest commit of the branch
LATEST_COMMIT_ID=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT object_id FROM git_refs WHERE ref_name='refs/heads/$BRANCH_NAME';" | xargs)

if [ -z "$LATEST_COMMIT_ID" ]; then
  echo "Branch '$BRANCH_NAME' does not exist."
  exit 1
fi

# Retrieve the tree for the latest commit
TREE_ID=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT content FROM git_objects WHERE object_id='$LATEST_COMMIT_ID';" | jq -r '.tree')

# Retrieve the blob content from the tree
RECIPE_ID=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT content FROM git_objects WHERE object_id='$TREE_ID';" | jq -r '.[0].id')

# Write the blob content to the working directory
CONTENT=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -t -c "SELECT content FROM git_objects WHERE object_id='$RECIPE_ID';")
echo "$CONTENT" >"$RECIPE_ID.recipejson"

echo "Checked out branch '$BRANCH_NAME'."
