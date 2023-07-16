#!/bin/ash
  if [ -z "${1}" ]; then
    set -- "node" /next/cluster.js
  fi

  exec "$@"