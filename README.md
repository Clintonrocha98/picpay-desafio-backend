<h1 align="center" style="font-weight: bold;">Picpay-desafio-backend 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a>
</p>

<p align="center">
    <b>Minha solução para o desafio do Picpay.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- [Express JS](https://expressjs.com)
- [Typescript](https://www.typescriptlang.org)
- [PostgreSQL](https://www.postgresql.org)
- [Docker | Compose](https://www.docker.com)
- [Vitest](https://vitest.dev)
- [Supertest](https://www.npmjs.com/package/supertest)

<h2 id="started">Getting started</h2>

<h3>Requirements</h3>

- [NodeJS](https://nodejs.org/en)
- [Git](https://git-scm.com)
- Caso não estiver usando docker, é ser necessário ter [PostgreSQL](https://www.postgresql.org).

<h3>Cloning</h3>

Como clonar esse projeto:

```bash
git clone git@github.com:Clintonrocha98/picpay-desafio-backend.git
```

<h3>Config .env variables</h2>

Use `.env.example` como referência para criar seu arquivo de configuração`.env` com as informações do banco de dados principal.

No caso do banco para testes E2E, é necessário criar outro arquivo e ser nomeado como `.env.test` ele segue a mesma estrutura do `.env.example`.

```yaml
POSTGRE_USER=usuario
POSTGRE_HOST=host
POSTGRE_PASSWORD=password
POSTGRE_DATABASE=database
```

<h3>Starting</h3>

Se você estiver usando um banco local:

```bash
npm run dev
```

Caso você for usar docker:

```bash
npm run db:dev
npm run dev
```

<h3>Testing</h3>

Testes unitários:

```bash
npm run test
```

Testes E2E:

```bash
npm run db:test
npm run test:e2e
```

<h2 id="routes">📍 API Endpoints</h2>

​
| route | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /user</kbd> | Cria um novo usuário [detalhes da request](#post-user-detail)
| <kbd>POST /transaction</kbd> | Faz uma transação entre dois usuários [detalhes da request](#post-transaction-detail)

<h3 id="post-user-detail">POST /user</h3>

**REQUEST**

```json
{
  "firstName": "fulano",
  "lastName": "de tal",
  "document": "12345678901",
  "balance": 1000,
  "email": "fulano@email.com",
  "password": "123456789",
  "usertype": "comum" //comum ou lojista
}
```

<h3 id="post-transaction-detail">POST /transaction</h3>

**REQUEST**

```json
{
  "payer": 1,
  "payee": 2,
  "amount": 100
}
```

**RESPONSE**

```json
{
  "payer": 1,
  "payee": 2,
  "amount": 100,
  "date_transaction": "Thu Feb 22 2024 10:26:18 GMT-0300 (Horário Padrão de Brasília)"
}
```

