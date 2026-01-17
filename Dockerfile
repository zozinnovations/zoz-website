# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM caddy:2.7-alpine

# Security updates
RUN apk update && apk upgrade --no-cache

# Create caddy user
RUN adduser -D caddy

# Copy assets
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

# Grant permissions
RUN chown -R caddy:caddy /srv && \
    mkdir -p /config/caddy /data/caddy && \
    chown -R caddy:caddy /config /data

# Run as non-root user
USER caddy