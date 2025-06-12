# First Stage: Build the App
FROM node:22.11.0 AS builder

WORKDIR /app

COPY package*.json .

# Install dependencies npm
RUN npm install

COPY . .

# Build the application
RUN npm run storybook:build:prod


# Second Stage: Setup the runtime
FROM nginx:stable-alpine AS prod-stage

WORKDIR /app

COPY --from=builder /app/storybook-static/ /usr/share/nginx/html

# Copiez le fichier de configuration Nginx personnalisé
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]