BASE_COMPOSE_FILES = -f docker-compose.yml
ENV_FILE = .env

# --- Global Commands ---
all: dev-up-all ## Run the full development startup
dev: dev-up-all ## Run the full development startup
dev-down: dev-docker-down ## Run the full development startup

DOCKER_COMPOSE = docker compose $(DOCKER_FILES) --env-file $(ENV_FILE)

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

# --- Development Targets ---

.PHONY: dev-docker-up dev-docker-down dev-up-all
dev-docker-up: DOCKER_FILES = $(BASE_COMPOSE_FILES)
dev-docker-up: ## Start the Docker services (upstream-db zero-cache)
	@echo "\033[1;32m╭─────────────────────────────────╮\033[0m"
	@echo "\033[1;32m│\033[0m \033[37mMODE:\033[0m \033[1;31mDEVELOPMENT \033[0m              \033[1;32m│\033[0m"
	@echo "\033[1;32m─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─\033[0m"
	@echo "\033[1;32m│ \033[32m🐳 Starting Docker services... \033[0m \033[1;32m│\033[0m"
	@echo "\033[1;32m╰─────────────────────────────────╯\033[0m"
	@$(DOCKER_COMPOSE) up -d upstream-db

dev-docker-down: DOCKER_FILES = $(BASE_COMPOSE_FILES)
dev-docker-down: ## Stop the Docker services (upstream-db zero-cache)
	@echo "\033[1;33m╭─────────────────────────────────────╮\033[0m"
	@echo "\033[1;33m│ \033[33m🐳 Shutting down Docker services...\033[0m \033[1;33m│\033[0m"
	@echo "\033[1;33m╰─────────────────────────────────────╯\033[0m"
	@$(DOCKER_COMPOSE) down

# The main development target:
dev-up-all: dev-docker-up
	@echo "--- Database operations complete. Starting app via (pnpm dev) ---"
	$(shell cat $(ENV_FILE) | xargs) pnpm dev
