user := "osakasfavoritedev"
project := "3dgifs"

git_hash := `git rev-parse --short HEAD`

# Default recipe
default:
    @just -l

# Launch docker dev containers and enable watch
dev:
    docker compose --profile dev up --watch

# Build for arm64 and amd64 then push both  
push:
    docker buildx build \
        --platform linux/amd64,linux/arm64 \
        -t {{user}}/{{project}}:{{git_hash}} \
        -t {{user}}/{{project}}:latest \
        --push .