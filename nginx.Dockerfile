FROM debian:bookworm-slim as base

COPY build-nginx.sh /build-nginx.sh

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
  build-essential \
  libpcre3-dev \
  zlib1g-dev \
  libssl-dev \
  wget \
  unzip \
  uuid-dev \
  make \
  gcc \
  && chmod +x /build-nginx.sh

RUN /build-nginx.sh \
  && apt-get remove -y build-essential wget \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/* \
  && echo -e "\nNginx version: $(nginx -v 2>&1)\n built!!\n"

#-------------------------------------------------

#FROM base
#COPY index.html /usr/share/nginx/html/index.html
#COPY health.conf /etc/nginx/conf.d/health.conf

#RUN mkdir /var/cache/ngx_pagespeed/ \
#    && chown nginx:nginx /var/cache/ngx_pagespeed/

#--------------------------------------------------

EXPOSE 80
EXPOSE 443
