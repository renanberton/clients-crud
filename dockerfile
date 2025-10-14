FROM node:18-alpine
WORKDIR /app

# Copiar primeiros
COPY package.json package-lock.json ./
RUN npm ci

# Copiar código
COPY . .

ENV VITE_API_URL=https://boasorte.teddybackoffice.com.br

# Build
RUN npm run build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000", "--single"]