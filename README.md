# CRUD Clients - React + TypeScript

Sistema de gerenciamento de clientes com operações completas de CRUD (Create, Read, Update, Delete), desenvolvido em React com TypeScript e Vite.

## Funcionalidades

- **Cadastro e gerenciamento** de clientes
- **Interface responsiva** para desktop e mobile  
- **Paginação inteligente** com navegação numérica
- **Formulários com validação** e máscaras monetárias
- **Modais** para adicionar, editar e confirmar exclusões
- **Tratamento de erros** para diferentes cenários de API

## Tecnologias Necessárias para executar o projeto

**Para execução local:**
- Node.js (versão 18 ou superior)
- npm ou yarn

**Para execução com Docker:**
- Docker (versão 20 ou superior)

## Como Executar

### Opção 1: Execução Local

**1. Clone o repositório:**

git clone [url-do-repositorio]

**2. Entre no diretório do projeto:**

cd crud-clients

**3. Intale as Dependências:**

npm install

**4. Execute em modo desenvolvimento:**

npm run dev

**5. Acesse a aplicação em:**

http://localhost:5173


### Opção 2: Execução com Docker

**1. Clone o Repositório:**

git clone [url-do-repositorio]

**2. Entre no diretório do projeto:**

cd crud-clients

**3. Construa a Imagem Docker:**

docker build -t crud-clients .

**4. Execute o Container:**

docker run -p 3000:80 crud-clients

**5. Acesse a aplicação em:**

http://localhost:3000


### Escolha o método que preferir! 

Ambos fornecem a mesma funcionalidade completa da aplicação.

Caso prefira visualizar o projeto em produção, basta acessar: 

https://clients-crud-dun.vercel.app/


## O espirito nobre engrandece o menor dos homens.