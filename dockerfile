FROM node:18-alpine
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]