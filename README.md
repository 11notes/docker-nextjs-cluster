# Alpine :: Nextjs Cluster
Run Nextjs Cluster based on Alpine Linux. Small, lightweight, secure and fast 🏔️

## Volumes
* **/next/js/** - Directory of  your nextjs standalone app

## Run
```shell
docker run --name nextjs-cluster \
  -v ../js:/next/js \
  -e PORTS=8080-8096 \
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

## Parent
* [11notes/node:stable](https://github.com/11notes/docker-node)

## Build with
* [Alpine Linux](https://alpinelinux.org)
* [NodeJS](https://nodejs.org/en)

## Tips
* Don't bind to ports < 1024 (requires root), use NAT/reverse proxy
* [Permanent Storage](https://github.com/11notes/alpine-docker-netshare) - Module to store permanent container data via NFS/CIFS and more