# :crocodile: Template API NodeJS+Express

Nodejs api with Express and postgres db

## :floppy_disk: Installation

```bash
npm install
```

## :wrench: Config

Create `.env` file. Check the example `.env.example`

:lock: How to create a secret key:

```bash
openssl rand -base64 64
```

:construction: Before first run:

Run `docker-compose` :whale: to start the database server

```bash
docker compose -f "compose.yaml" up -d --build adminer db
```

## :runner: Run

Dev mode:

```bash
npm run dev
```

Production mode:

```bash
npm run start
```

## :pushpin: Features

- Nodejs
- Express
- Swagger
- Cors
- Postgres
- Sequelize
- Eslint+Standard
- Env vars
- Middlewares
- Tests
- JWT
- BCrypt
- Joi
- Health
  