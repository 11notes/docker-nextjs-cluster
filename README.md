# Alpine :: Nextjs Cluster
![size](https://img.shields.io/docker/image-size/11notes/nextjs-cluster/4.18.2?color=0eb305) ![version](https://img.shields.io/docker/v/11notes/nextjs-cluster?color=eb7a09) ![pulls](https://img.shields.io/docker/pulls/11notes/nextjs-cluster?color=2b75d6) ![activity](https://img.shields.io/github/commit-activity/m/11notes/docker-nextjs-cluster?color=c91cb8) ![commit-last](https://img.shields.io/github/last-commit/11notes/docker-nextjs-cluster?color=c91cb8)

Run Nextjs Cluster based on Alpine Linux. Small, lightweight, secure and fast 🏔️

## Description
Use this image as a base layer to deploy or develop your nodejs application with express. Simply add your code and your package.json to `-v .../app:/next`. You can use the existing express.js class if you want, like this:

## Volumes
* **/next/js** - Directory of your nodejs express application (main.js or package.json)

## Run
```shell
docker run --name nextjs-cluster \
  -v ../js:/next/js \
  -d 11notesnextjs-cluster:[tag]
```

Overcommit (run more forks than CPUs available)
```shell
docker run --name nextjs-cluster \
  -v ../js:/next/js \
  -e PORTS=8080-8100 \
  -e OVERCOMMIT=true \
  -d 11notesnextjs-cluster:[tag]
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
| `TZ` | [Time Zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) | |
| `DEBUG` | Show debug information | |
| `JS` | path to javascript file for fork() | /next/js/server.js |
| `PORTS` | port range | 8080-8080+n(cpus) |
| `IP` | localhost or 127.0.0.1 or a dedicated IP | 0.0.0.0 |
| `OVERCOMMIT` | Fork more nodejs than CPU availabile | false |

## Parent image
* [11notes/node:stable](https://hub.docker.com/r/11notes/node)

## Built with (thanks to)
${{ CONTENT:11NOTES:IMAGE:NODE }}

## Tips
* Only use rootless container runtime (podman, rootless docker)
* Don't bind to ports < 1024 (requires root), use NAT/reverse proxy (haproxy, traefik, nginx)