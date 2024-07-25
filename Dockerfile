# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.13.1
ARG PNPM_VERSION=9.1.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

#RUN --mount=type=bind,source=package.json,target=package.json \
#  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#  --mount=type=cache,target=/root/.local/share/pnpm/store \
#  pnpm install --prod --frozen-lockfile

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY --chown=node:node /app/.next/standalone ./
COPY --chown=node:node /app/.next/static ./.next/static`

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD node server.js
