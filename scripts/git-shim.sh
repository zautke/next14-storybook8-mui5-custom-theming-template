#!/usr/bin/env bash

case "$1" in
add)
  shift
  ./git-add.sh "$@"
  ;;
commit)
  shift
  ./git-commit.sh "$@"
  ;;
checkout)
  shift
  ./git-checkout.sh "$@"
  ;;
diff)
  shift
  ./git-diff.sh "$@"
  ;;
*)
  echo "Unsupported command: $1"
  ;;
esac
