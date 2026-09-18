FROM php:8.2-fpm-alpine

# Install Nginx dan driver PostgreSQL/MySQL
RUN apk add --no-cache nginx postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql mysqli pdo_mysql

# Konfigurasi Nginx minimal
RUN mkdir -p /run/nginx
RUN echo 'server { \
    listen 80; \
    root /var/www/html; \
    index index.php index.html; \
    location / { try_files $uri $uri/ /index.php?$query_string; } \
    location ~ \.php$ { \
        fastcgi_pass 127.0.0.1:9000; \
        fastcgi_index index.php; \
        include fastcgi_params; \
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; \
    } \
}' > /etc/nginx/http.d/default.conf

COPY . /var/www/html/

EXPOSE 80

CMD php-fpm -D && nginx -g "daemon off;"