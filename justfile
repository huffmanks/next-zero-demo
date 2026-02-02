set dotenv-load

base_compose_file := "-f docker-compose.yml"

# List available commands
default:
	@just --list

# --- DEV ---
# Start dev environment (Docker + Migrations + ZeroCache)
dev:
    @just -E .env.development _dev-up-all

# Shut down dev Docker services
dev-down:
    @just -E .env.development _down

# --- PROD ---
# Start prod environment (Docker + Migrations)
prod:
    @just -E .env.production _prod-up-all

# Shut down prod Docker services
prod-down:
    @just -E .env.production _down

# --- HIDDEN ---

_dev-up-all: _docker-up-dev
	@echo "Waiting for database..."
	@until docker compose {{base_compose_file}} exec -T upstream-db pg_isready; do sleep 1; done
	@echo "Migrating database..."
	pnpm db:migrate
	@echo "Starting zero-cache..."
	pnpm cache:dev

_docker-up-dev:
	docker compose {{base_compose_file}} --env-file .env.development up -d upstream-db

_prod-up-all:
	docker compose {{base_compose_file}} --env-file .env.production up --build --force-recreate -d

_down:
	docker compose {{base_compose_file}} down -v