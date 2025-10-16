SHELL := /bin/bash

.PHONY: build clean serve lint format format-check

build:
	@mkdir -p public/js public/styles
	@cp -r src/js/* public/js/ 2>/dev/null || true
	@cp -r src/styles/* public/styles/ 2>/dev/null || true
	@echo "Built static assets to public/"

clean:
	@rm -rf public/js public/styles
	@echo "Cleaned public artifacts"

serve: build
	@python3 -m http.server 8000 --directory public
	@echo "Serving on http://localhost:8000 (public/)"

lint:
	@npx --yes eslint src/js --max-warnings=0

format:
	@npx --yes prettier --write .

format-check:
	@npx --yes prettier --check .
