# Alpine :: Nextjs Cluster
Run Nextjs Cluster based on Alpine Linux. Small, lightweight, secure and fast 🏔️

## Volumes
* **/next/js** - Directory of your nextjs standalone app

## Run
```shell
docker run --name nextjs-cluster \
  -v ../js:/next/js \
  -d 11notes/nextjs-cluster:[tag]
```

Overcommit (run more forks than CPUs available)
```shell
docker run --name nextjs-cluster \
  -v ../js:/next/js \
  -e PORTS=8080-8100 \
  -e OVERCOMMIT=true \
  -d 11notes/nextjs-cluster:[tag]
```

## Defaults
| Parameter | Value | Description |
| --- | --- | --- |
| `user` | docker | user docker |
| `uid` | 1000 | user id 1000 |
| `gid` | 1000 | group id 1000 |
| `home` | /next | home directory of user docker |

## Environment
| Parameter | Value | Default |
| --- | --- | --- |
| `JS` | path to javascript file for fork() | /next/js/server.js |
| `PORTS` | port range | 8080-n(cpus) |
| `IP` | localhost or 127.0.0.1 or a dedicated IP | 0.0.0.0 |
| `OVERCOMMIT` | Fork more nodejs than CPU availabile | false |

## Parent
* [11notes/node:stable](https://github.com/11notes/docker-node)

## Build with
* [Alpine Linux](https://alpinelinux.org)
* [NodeJS](https://nodejs.org/en)

## Tips
* Don't bind to ports < 1024 (requires root), use NAT/reverse proxy
* [Permanent Storage](https://github.com/11notes/alpine-docker-netshare) - Module to store permanent container data via NFS/CIFS and more