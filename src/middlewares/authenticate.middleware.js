const { verifyToken } = require('../utils/jwt.util')

function requireAuth (req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token)
    if (decoded && decoded.sub) {
      req.userId = decoded.sub
      return next()
    }
  }
  return res.status(401).json({ message: 'Could not validate credentials' })
}

module.exports = { requireAuth }
