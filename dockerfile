FROM node:18-alpine
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json package-lock.json ./
RUN npm ci

# Copiar o restante do projeto
COPY . .

# Build do Vite
RUN npm run build

# Instalar servidor estático
RUN npm install -g serve

# Expor porta
EXPOSE 3000

# Servir a pasta correta do build
CMD ["serve", "-s", "dist", "-l", "3000", "--single"]
