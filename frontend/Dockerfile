FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install && npm audit fix

COPY . .

RUN npm run build



FROM nginxinc/nginx-unprivileged:stable-alpine

EXPOSE 8080

USER root

RUN chown -R 1001:1001 /usr/share/nginx/html && \
    chown -R 1001:1001 /etc/nginx/conf.d

COPY --chown=1001:1001 --from=builder /app/build /usr/share/nginx/html

USER 1001

CMD echo "server { \
      listen       8080; \
      server_name  ـ; \
      server_tokens off; \
      error_page 405 = \$uri; \
      gzip on; \
      gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css; \
      ${NGINX_EXTRA_CONFIG} \
      location / { \
      root   /usr/share/nginx/html; \
      index  index.html index.htm; \
      try_files \$uri \$uri/ /index.html; \
      } \
      # redirect server error pages to the static page /50x.html \
      error_page   500 502 503 504  /50x.html; \
      location = /50x.html { \
      root   /usr/share/nginx/html; \
      } \
    }" > /etc/nginx/conf.d/default.conf && \
    find /usr/share/nginx/html -type f -exec sed -i -e 's@ENV_BACKEND_URL@'"${REACT_APP_BACKEND_URL}"'@g' '{}' \; && \
    export KEYCLOAK_CONFIG=$(echo $REACT_APP_KEYCLOAK_CONFIG | sed 's/"/\\"/g') && find /usr/share/nginx/html -type f -exec sed -i -e 's@"ENV_KEYCLOAK_CONFIG"@'\'"${KEYCLOAK_CONFIG}"\''@g' '{}' \; && \
    find /usr/share/nginx/html -type f -exec sed -i -e 's@ENV_DOMAIN_NAME@'"${REACT_APP_DOMAIN_NAME}"'@g' '{}' \; && \
    nginx -g 'daemon off;'