FROM php:8.3-cli

# Installa solo lo stretto necessario: unzip (per Composer), libpq-dev (per PostgreSQL) e Node/NPM (per il frontend)
RUN apt-get update && apt-get install -y \
    unzip \
    libpq-dev \
    nodejs \
    npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Installa l'estensione PHP essenziale per PostgreSQL
RUN docker-php-ext-install pdo_pgsql

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www