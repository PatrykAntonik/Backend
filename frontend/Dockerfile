FROM node:24.10.0-alpine AS builder

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine3.22 AS runner

USER nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx --from=builder /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst '8080' < /etc/nginx/nginx.conf > /tmp/nginx.conf && exec nginx -c /tmp/nginx.conf -g 'daemon off;'"]


FROM node:24.10.0-alpine AS dev-runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

CMD ["npm", "start"]
