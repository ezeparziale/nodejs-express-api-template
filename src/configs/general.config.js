require('dotenv').config()

// Server
const PORT = process.env.PORT || 3000
const BACKEND_CORS_ORIGINS = process.env.BACKEND_CORS_ORIGINS || '*'

// Bcrypt
const SALT = process.env.SALT || 10

// Jwt
const SECRET_KEY = process.env.SECRET_KEY
const ALGORITHM = process.env.ALGORITHM || 'HS256'
const ACCESS_TOKEN_EXPIRE_MINUTES = process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 30

// Postgres Database
const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_DB = process.env.POSTGRES_DB

module.exports = {
  PORT,
  SALT,
  SECRET_KEY,
  ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES,
  BACKEND_CORS_ORIGINS,
  POSTGRES_HOSTNAME,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB
}
