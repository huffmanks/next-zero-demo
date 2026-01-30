BASE_COMPOSE_FILES = -f docker-compose.yml
DEV_ENV_FILE = .env.development
PROD_ENV_FILE = .env.production

# --- Global Commands ---
all: dev-up-all ## Run the full development startup
dev: dev-up-all ## Run the full development startup
dev-down: dev-docker-down ## Run the full development startup
prod: prod-up-all ## Run the full production startup
prod-down: prod-docker-down ## Run the full production startup

DOCKER_COMPOSE = docker compose $(DOCKER_FILES) --env-file $(ENV_FILE)

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

# --- Development Targets ---

.PHONY: dev-docker-up dev-docker-down dev-up-all
dev-docker-up: DOCKER_FILES = $(BASE_COMPOSE_FILES)
dev-docker-up: ENV_FILE = $(DEV_ENV_FILE)
dev-docker-up: ## Start the Docker services (upstream-db zero-cache)
	@echo "\033[1;32m╭─────────────────────────────────╮\033[0m"
	@echo "\033[1;32m│\033[0m \033[37mMODE:\033[0m \033[1;31mDEVELOPMENT \033[0m              \033[1;32m│\033[0m"
	@echo "\033[1;32m─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\033[0m"
	@echo "\033[1;32m│ \033[32m🐳 Starting Docker services... \033[0m \033[1;32m│\033[0m"
	@echo "\033[1;32m╰─────────────────────────────────╯\033[0m"
	@$(DOCKER_COMPOSE) up -d upstream-db

dev-docker-down: DOCKER_FILES = $(BASE_COMPOSE_FILES)
dev-docker-down: ENV_FILE = $(DEV_ENV_FILE)
dev-docker-down: ## Stop the Docker services (upstream-db zero-cache)
	@echo "\033[1;33m╭─────────────────────────────────────╮\033[0m"
	@echo "\033[1;33m│ \033[33m🐳 Shutting down Docker services...\033[0m \033[1;33m│\033[0m"
	@echo "\033[1;33m╰─────────────────────────────────────╯\033[0m"
	@$(DOCKER_COMPOSE) down

# The main development target:
dev-up-all: dev-docker-up
	@echo "--- Migrating database... ---"
	$(shell cat $(DEV_ENV_FILE) | xargs) pnpm db:migrate
	@echo "--- Database operations complete. Starting app via (pnpm dev) ---"
	$(shell cat $(DEV_ENV_FILE) | xargs) pnpm dev

# --- Production Targets ---

.PHONY: prod-docker-up prod-docker-down prod-up-all
prod-docker-up: DOCKER_FILES = $(BASE_COMPOSE_FILES)
prod-docker-up: ENV_FILE = $(PROD_ENV_FILE)
prod-docker-up: ## Start the production environment
	@echo "\033[1;32m╭─────────────────────────────────╮\033[0m"
	@echo "\033[1;32m│\033[0m \033[37mMODE:\033[0m \033[1;31mPRODUCTION  \033[0m              \033[1;32m│\033[0m"
	@echo "\033[1;32m─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\033[0m"
	@echo "\033[1;32m│ \033[32m🐳 Starting Docker services... \033[0m \033[1;32m│\033[0m"
	@echo "\033[1;32m╰─────────────────────────────────╯\033[0m"
	@$(DOCKER_COMPOSE) up -d

prod-docker-down: DOCKER_FILES = $(BASE_COMPOSE_FILES)
prod-docker-down: ENV_FILE = $(PROD_ENV_FILE)
prod-docker-down: ## Stop the production environment
	@echo "\033[1;33m╭─────────────────────────────────────╮\033[0m"
	@echo "\033[1;33m│ \033[33m🐳 Shutting down Docker services...\033[0m \033[1;33m│\033[0m"
	@echo "\033[1;33m╰─────────────────────────────────────╯\033[0m"
	@$(DOCKER_COMPOSE) down

# The main production target:
prod-up-all: prod-docker-up
	@echo "--- Migrating database... ---"
	$(shell cat $(DEV_ENV_FILE) | xargs) pnpm db:migrate
	@echo "--- Database operations complete. ---"