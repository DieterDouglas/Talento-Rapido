FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
        libpq-dev \
        libzip-dev \
        libonig-dev \
        libxml2-dev \
        zip \
        unzip \
        git \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip mbstring bcmath xml \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --optimize-autoloader

COPY . .
RUN composer dump-autoload --optimize --no-dev

RUN mkdir -p storage/framework/{cache,sessions,testing,views} storage/logs \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD php artisan storage:link || true \
    && php artisan migrate --force \
    && php artisan db:seed-if-empty \
    && php artisan serve --host 0.0.0.0 --port ${PORT:-8080}
