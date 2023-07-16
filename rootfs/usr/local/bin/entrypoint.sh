#!/bin/ash
  if [[ -z "${PORTS}" ]]; then PORTS=3000; fi

  if [ -z "${1}" ]; then
    set -- "node" /next/cluster.js
  fi

  exec "$@"