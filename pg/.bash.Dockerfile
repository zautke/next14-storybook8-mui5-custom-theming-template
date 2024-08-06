FROM ubuntu

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends --no-install-suggests -y \
  sudo \
  git \
  curl \
  openssh-server


COPY $HOME/.ssh/id_rsa /root/.ssh/id_rsa
# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
  chmod 0700 /root/.ssh
RUN GIT_SSH_COMMAND="ssh -i /root/.ssh/id_rsa -o IdentitiesOnly=yes" git clone git@github.com:zautke/.bash \
  && cp -rP .bash/ /root/.bash \
  && ln -sf /root/.bash/.bashrc /root/.bashrc
