# Transmogrifier Makefile

# Default target
.PHONY: help
help:
	@echo "┌───────────────────────────────────────┐"
	@echo "│         TRANSMOGRIFIER MAKEFILE       │"
	@echo "└───────────────────────────────────────┘"
	@echo ""
	@echo "Usage:"
	@echo "  make [command]"
	@echo ""
	@echo "Available commands:"
	@echo "  dev         - Start development server with turbopack"
	@echo "  build       - Build the application"
	@echo "  start       - Start production server"
	@echo "  test        - Run tests"
	@echo "  lint        - Lint the code"
	@echo "  help        - Show this help message"
	@echo ""

# Development server
.PHONY: dev
dev:
	@echo "Starting development server..."
	npx next dev --turbopack

# Build application
.PHONY: build
build:
	@echo "Building application..."
	npx next build

# Start production server
.PHONY: start
start:
	@echo "Starting production server..."
	npx next start

# Run tests
.PHONY: test
test:
	@echo "Running tests..."
	npx jest

# Lint code
.PHONY: lint
lint:
	@echo "Linting code..."
	npx next lint
