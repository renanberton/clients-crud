FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Install http-server instead of serve
RUN npm install -g http-server

EXPOSE 3000

# Use http-server
CMD ["http-server", "dist", "-p", "3000", "-a", "0.0.0.0"]