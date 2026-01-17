# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM caddy:2.7-alpine

RUN apk update && apk upgrade --no-cache

# allow binding to 80/443 as non-root
RUN apk add --no-cache libcap \
  && setcap 'cap_net_bind_service=+ep' /usr/bin/caddy

# create caddy user if missing (idempotent)
RUN addgroup -S caddy || true \
  && adduser -S -D -H -G caddy caddy || true

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

RUN mkdir -p /config/caddy /data/caddy /srv && \
    chown -R caddy:caddy /srv /config /data

USER caddy
