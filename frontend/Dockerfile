# ---- Stage 1: build the CRA static bundle ----
FROM node:20-alpine AS build

WORKDIR /app

# Cache npm install separately from source code
COPY package*.json ./
RUN npm ci

# Copy source and produce the optimized production build
# (react-scripts build -> /app/build)
COPY . .
RUN npm run build

# ---- Stage 2: serve the static build with Nginx ----
FROM nginx:alpine

# Remove Nginx's default site config and replace it with ours,
# which also reverse-proxies /api to the backend container.
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
