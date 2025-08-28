user := "osakasfavoritedev"
project := "3dgifs"

git_hash := `git rev-parse --short HEAD`

# Default recipe
default:
    @just -l

# Launch dev containers and enable watch
dev:
    docker compose -f compose.yaml -f compose.dev.yaml up --watch

# Build for arm64 and amd64 then push both  
push:
    docker buildx build \
        # --target prod (uncomment later when using multi-stage)
        --platform linux/amd64,linux/arm64 \
        -t {{user}}/{{project}}:{{git_hash}} \
        -t {{user}}/{{project}}:latest \
        --push .

# Pull latest and start prod containers
prod:
    docker compose -f compose.yaml -f compose.prod.yaml pull
    docker compose -f compose.yaml -f compose.prod.yaml up -d
