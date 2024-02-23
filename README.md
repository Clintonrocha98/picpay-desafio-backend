<h1 align="center" style="font-weight: bold;">Picpay-desafio-backend 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a>
</p>

<p align="center">
    <b>My solution to the <a href="https://github.com/PicPay/picpay-desafio-backend/tree/master?tab=readme-ov-file" target="_blank">Picpay challenge</a>.</b>
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
- If you are not using Docker, you must have [PostgreSQL](https://www.postgresql.org).

<h3>Cloning</h3>

How to clone this project:

```bash
git clone git@github.com:Clintonrocha98/picpay-desafio-backend.git
```

<h3>Config .env variables</h2>

Use `.env.example` as a reference to create your `.env` configuration file with the main database information.

In the case of the E2E test bench, it is necessary to create another file and be named `.env.test`, it follows the same structure as `.env.example`.

```yaml
POSTGRE_USER=user
POSTGRE_HOST=host
POSTGRE_PASSWORD=password
POSTGRE_DATABASE=database
```

<h3>Starting</h3>

If you are using a local bank:

```bash
npm install
npm run dev
```

If you are going to use docker:

```bash
npm install
npm run db:dev
npm run dev
```

<h3>Testing</h3>

Unitary tests:

```bash
npm run test
```

E2E Tests:

```bash
npm run db:test
npm run test:e2e
```

<h2 id="routes">📍 API Endpoints</h2>

​
| route | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /user</kbd> | Create a new user [request details](#post-user-detail)
| <kbd>POST /transaction</kbd> | Makes a transaction between two users [request details](#post-transaction-detail)

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
  "usertype": "lojista"
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
