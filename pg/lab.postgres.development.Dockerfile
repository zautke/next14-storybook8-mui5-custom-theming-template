FROM postgres:16-alpine

RUN apk add --no-cache \
  git \
  curl \
  openssh-server \
  libpq-dev \
  postgresql16-client

## Authorize SSH Host
#RUN mkdir -p /root/.ssh && \
#  chmod 0700 /root/.ssh
#RUN git clone git@github.com:zautke/.bash \
#  && cp -rP .bash/ /root/.bash \
#  && ln -sf /root/.bash/.bashrc /root/.bashrc

## Create a directory to store PostgreSQL data and logs
#RUN mkdir -p ${PGDATA} /tmp /var/log/postgresql && chown -R postgres:postgres ${PGDATA} /tmp /var/log/postgresql

#COPY entrypoint.sh /sbin/entrypoint.sh
#RUN chmod 755 /sbin/entrypoint.sh


COPY pg_init/*.sql /docker-entrypoint-initdb.d/
RUN chmod a+r /docker-entrypoint-initdb.d/*




# $ docker build -t example --build-arg ssh_prv_key="$(cat ~/.ssh/id_rsa)" --build-arg ssh_pub_key="$(cat ~/.ssh/id_rsa.pub)" --squash .
#
