user := "osakasfavoritedev"
project := "3dgifs"

git_hash := `git rev-parse --short HEAD`

# Default recipe
default:
    @just -l

# Launch docker dev containers and enable watch
dev:
    docker compose --profile dev up --watch

# Build and tag image with git hash and latest
build:
    docker build -t {{user}}/{{project}}:{{git_hash}} -t {{user}}/{{project}}:latest .

# Push both tags to registry
push:
    docker push {{user}}/{{project}}:{{git_hash}}
    docker push {{user}}/{{project}}:latest