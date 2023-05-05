require('dotenv').config()

// Server
const PORT = process.env.PORT || 3000

// Api
const SECRET_KEY = process.env.SECRET_KEY || 3000
const ALGORITHM = process.env.ALGORITHM || 3000
const ACCESS_TOKEN_EXPIRE_MINUTES = process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 3000

// Postgres Database
const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME || 3000
const POSTGRES_PORT = process.env.POSTGRES_PORT || 3000
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 3000
const POSTGRES_USER = process.env.POSTGRES_USER || 3000
const POSTGRES_DB = process.env.POSTGRES_DB || 3000

module.exports = {
  PORT,
  SECRET_KEY,
  ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES,
  POSTGRES_HOSTNAME,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB
}
