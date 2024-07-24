
FROM node:lts-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

#------------------------------------------------------------

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

#------------------------------------------------------------

FROM base AS runner
#LABEL org.opencontainers.image.title="Aqua Trivy" \
#  org.opencontainers.image.description="Run unlimited vulnerability scans against remote or locally stored images. Understand any security issues that may be present in images before you pull and use them." \
#  org.opencontainers.image.vendor="Aqua Security Software" \
#  com.docker.desktop.extension.api.version=">= 0.2.0" \
#  com.docker.desktop.extension.icon="https://raw.githubusercontent.com/aquasecurity/trivy-docker-extension/main/trivy.svg" \
#  com.docker.extension.publisher-url="https://trivy.dev" \
#  com.docker.extension.screenshots="[{\"alt\": \"Trivy Dark Screenshot\", \"url\": \"https://raw.githubusercontent.com/aquasecurity/trivy-docker-extension/main/.github/images/screenshot.png\"},{\"alt\": \"Trivy light screenshot\", \"url\": \"https://raw.githubusercontent.com/aquasecurity/trivy-docker-extension/main/.github/images/screenshot_light.png\"}]" \
#  com.docker.extension.detailed-description="<h1>Free and Unlimited Vulnerability Scanning</h1><h3>Take control of your application security with Trivy</h3>Trivy is the world’s most popular open source vulnerability and misconfiguration scanner. It is reliable, fast, extremely easy to use, and it works wherever you need it. <ul><li>Scan locally stored images by choosing from the list</li><li>Scan remote images simply by entering the name in the search box</li><li>Filter by the severity of the vulnerability or optionally only show issues with fixes</li></ul>" \
#  com.docker.extension.additional-urls="[{\"title\":\"Trivy Website\",\"url\":\"https://trivy.dev/\"},{\"title\":\"Issues\",\"url\":\"https://github.com/aquasecurity/trivy/issues\"},{\"title\":\"Slack\",\"url\":\"https://slack.aquasec.com/\"}]" \
#  com.docker.extension.category="security"
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

#
# docker build ... --progress=plain --no-cache
