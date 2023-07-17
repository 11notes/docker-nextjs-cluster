# :: Header
  FROM 11notes/node:stable
  ENV APP_ROOT=/next

# :: Run
  USER root

  # :: prepare image
    RUN set -ex; \
      mkdir -p ${APP_ROOT}/js;

  # :: copy root filesystem changes and set correct permissions
    COPY ./rootfs /
    RUN set -ex; \
      chmod +x -R /usr/local/bin; \
      chown -R 1000:1000 \
        ${APP_ROOT}

# :: Volumes
  VOLUME ["${APP_ROOT}/js"]

# :: Start
  USER docker
  ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]