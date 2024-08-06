FROM ubuntu

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends --no-install-suggests -y \
  sudo \
  git \
  curl \
  openssh-server


COPY ./id_rsa /root/.ssh/id_rsa

# ssh-keyscan -t rsa github.com >> known_hosts
COPY known_hosts /root/.ssh/known_hosts

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
  chmod 0700 /root/.ssh

# Set the permissions for the private key
RUN chmod 600 /root/.ssh/id_rsa


# Configure SSH to use the key (optional but recommended)
RUN echo "Host *\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

RUN ssh -vvvT git@github.com
RUN git clone git@github.com:zautke/.bash \
  && cp -rP .bash/ /root/.bash \
  && ln -sf /root/.bash/.bashrc /root/.bashrc


