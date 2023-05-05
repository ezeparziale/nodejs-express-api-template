const jwt = require('jsonwebtoken')
require('dotenv').config()

const createAccessToken = (payload) => {
  const token = jwt.sign(payload,
    process.env.SECRET_KEY,
    {
      expiresIn: 60 * process.env.ACCESS_TOKEN_EXPIRE_MINUTES,
      algorithm: process.env.ALGORITHM
    })
  return token
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded
  } catch (error) {
    return null
  }
}

module.exports = { createAccessToken, verifyToken }
