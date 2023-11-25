# API Escribo

## ⚡ Tech Stack

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Jest](https://jestjs.io/pt-BR/)

## Sobre a API

API RESTful para autenticação de usuários, que permite operações de cadastro (sign up),
autenticação (sign in) e recuperação de informações do usuário. O deploy da API foi feito no Render.
 
Aqui estão algumas instruções sobre como fazer requisições às URLs disponíveis.


#### Para testar as requisições, você pode usar o Postman para uma interface mais amigável.

### Exemplo para criar usuário:

```json 
{
  "nome": "Nome do Usuário",
  "email": "usuario@example.com",
  "senha": "senha123",
  "telefones": [
    {"numero": "123456789", "ddd": "11"}
  ]
}
```

#### Endpoint: POST /auth/register

https://api-escribo-7kwi.onrender.com/auth/register

### Exemplo para logar:

Insira o email e senha criados na etapa anterior.

```json 
{
  "email": "seuemail@example.com",
  "senha": "suaSenha"
}
```

#### Endpoint: POST /auth/login

https://api-escribo-7kwi.onrender.com/auth/login

### Obter Usuário por ID:

#### Endpoint: GET /user/:id

https://api-escribo-7kwi.onrender.com/user/:id

Requisitos:
- Altere o ":id" na URL pelo o ID do usuário criado:
- Inclua o token de autenticação no header da requisição:

