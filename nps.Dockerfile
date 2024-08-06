FROM debian:bookworm-slim as base

ARG source_nginx=https://nginx.org/download/
ARG version_nginx="$(curl -sL ${source_nginx} | grep -Eo 'nginx\-[0-9.]+[13579]\.[0-9]+' | sort -V | tail -n 1)"

RUN echo -e "\nNginx version: $version_nginx\n"

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
  sudo libssl-dev libxslt-dev libgd-dev curl nano gnupg2 ca-certificates lsb-release git dpkg-dev uuid-dev -y


RUN bash <(curl -f -L -sS https://ngxpagespeed.com/install) \
  --nginx-version "$version_nginx" -y
