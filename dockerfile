FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
# CORREÇÃO: --single para SPA
CMD ["serve", "-s", "build", "-l", "3000", "--single"]