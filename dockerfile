# Etapa 1: Build do React/Vite
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração SPA: qualquer rota aponta para index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
