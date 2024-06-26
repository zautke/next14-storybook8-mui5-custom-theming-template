#!/usr/bin/env bash

usage() {
  echo "Usage: git-commit.sh <message>"
  exit 1
}

if [ $# -ne 1 ]; then
  usage
fi

MESSAGE="$1"
PARENT_COMMIT=$(git rev-parse HEAD)

# Create a tree object (for simplicity, assume one file per commit)
TREE_CONTENT=$(echo -n "100644 blob $OBJECT_ID\t$FILE")
TREE_LENGTH=${#TREE_CONTENT}
TREE_OBJECT_TYPE="tree"
TREE_OBJECT_ID=$(echo -n "$TREE_OBJECT_TYPE $TREE_LENGTH\0$TREE_CONTENT" | sha1sum | awk '{print $1}')

# Create the commit object
COMMIT_CONTENT=$(printf "tree %s\nparent %s\nauthor You <you@example.com> $(date +%s) +0000\ncommitter You <you@example.com> $(date +%s) +0000\n\n%s" "$TREE_OBJECT_ID" "$PARENT_COMMIT" "$MESSAGE" "$MESSAGE")
COMMIT_LENGTH=${#COMMIT_CONTENT}
COMMIT_OBJECT_TYPE="commit"
COMMIT_OBJECT_ID=$(echo -n "$COMMIT_OBJECT_TYPE $COMMIT_LENGTH\0$COMMIT_CONTENT" | sha1sum | awk '{print $1}')

# Insert the tree object into the database
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME <<EOF
INSERT INTO git_objects (object_id, type, content) VALUES ('$TREE_OBJECT_ID', '$TREE_OBJECT_TYPE', '\\x$(echo -n "$TREE_OBJECT_TYPE $TREE_LENGTH\0$TREE_CONTENT" | xxd -p -c $TREE_LENGTH)');
EOF

# Insert the commit object into the database
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME <<EOF
INSERT INTO git_objects (object_id, type, content) VALUES ('$COMMIT_OBJECT_ID', '$COMMIT_OBJECT_TYPE', '\\x$(echo -n "$COMMIT_OBJECT_TYPE $COMMIT_LENGTH\0$COMMIT_CONTENT" | xxd -p -c $COMMIT_LENGTH)');
EOF

# Update the master branch to point to the new commit
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME <<EOF
UPDATE git_refs SET object_id='$COMMIT_OBJECT_ID' WHERE ref_name='refs/heads/master';
EOF

echo "Committed with ID: $COMMIT_OBJECT_ID"
