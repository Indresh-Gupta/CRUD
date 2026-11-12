# ---- Backend: Node.js + Express ----
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the manifest files first so Docker can cache the
# npm install layer separately from the source code layer.
# As long as package*.json don't change, rebuilds skip npm install.
COPY package*.json ./

# Install production dependencies only (no nodemon dev-reloading in prod).
# nodemon stays in package.json but is simply unused at runtime.
RUN npm install --omit=dev

# Now copy the rest of the backend source code
COPY . .

# Express listens on process.env.PORT (defaults to 8000 in index.js)
EXPOSE 8000

# Same command your package.json "start" script uses
CMD ["node", "index.js"]
