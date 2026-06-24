# API de Adoção de Pets

API RESTful para sistema de adoção de animais de estimação, desenvolvida com Node.js, Express e MySQL.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL2
- bcrypt
- jsonwebtoken (JWT)
- ESLint
- Prettier
- Nodemon

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

## Banco de dados

Crie o banco de dados executando o script SQL disponível em `src/database/banco.sql` no MySQL Workbench.

## Estrutura do projeto

src/

├── config/       # Conexão com o banco

├── controllers/  # Lógica das requisições

├── database/     # Script SQL

├── middlewares/  # Autenticação JWT

├── models/       # Acesso ao banco de dados

├── routes/       # Definição das rotas

└── services/     # Regras de negócio

tests/            # Testes REST Client

## Rotas públicas

| Método | Rota            | Descrição                        |
|--------|-----------------|----------------------------------|
| GET    | /pets/available | Lista pets disponíveis           |
| POST   | /users          | Cadastra novo usuário            |
| POST   | /login          | Realiza login e retorna token JWT|

## Rotas protegidas

Todas as rotas protegidas requerem o header:

Authorization: Bearer {token}

